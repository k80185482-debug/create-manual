"use server"

import { createClient } from "@/lib/supabase/server";

type ImageItem = {
  image?: File[];
  image_path?: string;
  image_url?: string | null;
};

type Content = {
  title?: string;
  body: string;
} & ImageItem;

type Contents = {
  purpose: string;
  applicableRange: string;
  term: Content[];
  materials: Content[];
  precaution: Content[];
  steps: Content[];
};

export const getManualById = async (id: number) => {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { data, error } = await supabase
    .from("Manual")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.log(error);
    throw new Error("Manual取得失敗");
  }

  const getImageUrls = async (path?: string) => {
    if (!path) return null;

    const { data } = await supabase.storage
      .from("manualImage")
      .createSignedUrl(path, 60);

    return data?.signedUrl ?? null;
  };

  const content: Contents = data.content;

  const newContent = {
    ...content,

    term: await Promise.all(
      (content.term ?? []).map(async (item) => ({
        ...item,
        image_url: await getImageUrls(item.image_path),
      }))
    ),

    materials: await Promise.all(
      (content.materials ?? []).map(async (item) => ({
        ...item,
        image_url: await getImageUrls(item.image_path),
      }))
    ),

    precaution: await Promise.all(
      (content.precaution ?? []).map(async (item) => ({
        ...item,
        image_url: await getImageUrls(item.image_path),
      }))
    ),

    steps: await Promise.all(
      (content.steps ?? []).map(async (item) => ({
        ...item,
        image_url: await getImageUrls(item.image_path),
      }))
    ),
  }

  console.log(data, content)

  return {
    ...data,
    content: newContent,
  };
};