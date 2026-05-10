"use server"

import { createClient } from "@/lib/supabase/server";

export const createProject = async (name: string, files: File[]) => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const imagePath = `${user.id}/${crypto.randomUUID()}`
  const { error: storageError } = await supabase.storage
    .from("ProjectImage")
    .upload(imagePath, files[0])

  if (storageError) {
    console.log(storageError)
    throw storageError;
  }

  const { error } = await supabase
    .from("Project")
    .insert([
      {
        name: name,
        authorId: user.id,
        imageUrl: imagePath
      }
    ])

  if (error) {
    console.log(error);
    throw new Error("プロジェクト作成失敗");
  }
}


  