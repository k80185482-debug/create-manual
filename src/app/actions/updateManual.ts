"use server"

import { createClient } from "@/lib/supabase/server";

type FormData = {
  id: number;
  Project: string;
  title: string;
  content: {
    purpose: string;
    applicableRange: string;

    term: {
      title: string;
      body: string;
      image?: File[]
      image_path?: string;
    }[];

    materials: {
      body: string;
      image?: File[];
      image_path?: string;
    }[];

    precaution: {
      body: string;
      image?: File[];
      image_path?: string;
    }[];

    steps: {
      title: string;
      body: string;
      image?: File[];
      image_path?: string;
    }[];
  };
  published: boolean;
};

export const upadateManual = async (Manualdata: FormData) => {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();
  console.log(Manualdata)

  if (!user) {
    throw new Error("ログインしてません")
  }

  const uploadImage  = async ( file?: File[] ) => {
    if ( !file || file.length === 0 ) return null;
    const imagePath = `${user.id}/${Manualdata.id}/${crypto.randomUUID()}`
    const { error: storageError } = await supabase.storage
    .from("manualImage")
    .upload(imagePath, file[0])

    if (storageError) {
      console.log(storageError)
      throw storageError;
    }

    return imagePath;
  }

  const newContent = {
    ...Manualdata.content,

    term: await Promise.all(
      Manualdata.content.term.map(async (data) => ({
        ...data,
        image_path: await uploadImage(data.image) ?? data.image_path,
        image: undefined,
      }))
    ),

    materials: await Promise.all(
      Manualdata.content.materials.map(async (data) => ({
        ...data,
        image_path: await uploadImage(data.image) ?? data.image_path,
        image: undefined,
      }))
    ),

    precaution: await Promise.all(
      Manualdata.content.precaution.map(async (data) => ({
        ...data,
        image_path: await uploadImage(data.image) ?? data.image_path,
        image: undefined,
      }))
    ),

    steps: await Promise.all(
      Manualdata.content.steps.map(async (data) => ({
        ...data,
        image_path: await uploadImage(data.image) ?? data.image_path,
        image: undefined,
      }))
    ),
  };

  const { error: updateError } = await supabase
    .from("Manual")
    .update({
      projectId: Manualdata.Project,
      title: Manualdata.title,
      content: newContent,
      published: Manualdata.published,
      authorId: user.id
    })
    .eq("id", Manualdata.id);

  if (updateError) {
    console.log(updateError);
    throw updateError;

}
}