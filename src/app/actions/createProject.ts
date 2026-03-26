"use server"

import { createClient } from "@/lib/supabase/server";

export const createProject = async (name: string) => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { error } = await supabase
    .from("Project")
    .insert([
      {
        name: name,
        authorId: user.id
      }
    ]);

  if (error) {
    console.log(error);
    throw new Error("プロジェクト作成失敗");
  }
}