"use server"

import { createClient } from "@/lib/supabase/server";

type FormData = {
  Project: string;
  title: string;
  content: {
    purpose: string;
    applicableRange: string;
    term: {
      title: string;
      body: string;
    }[];
    materials: string;
    precaution: { body: string; }[];
    steps: {
      title: string;
      body: string;
    }[];
  };
  published: boolean;
}

export const getManualById = async (id: number): Promise<FormData> => {

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

  return data;
};