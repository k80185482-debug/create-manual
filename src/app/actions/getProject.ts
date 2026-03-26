"use server"

import { createClient } from "@/lib/supabase/server";

type ProjectProps = {
  id: number
  name: string
  content: string
  authorId: string
}

export const getProject = async (): Promise<ProjectProps[]> => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { data, error } = await supabase
    .from("Project")
    .select("*")

  if (error) {
    console.log(error);
    throw new Error("プロジェクト取得失敗");
  }

  return data
}