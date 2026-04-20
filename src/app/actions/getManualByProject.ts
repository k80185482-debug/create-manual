"use server"

import { createClient } from "@/lib/supabase/server";

export const getManualByProject = async (projectId: number) => {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { data, error } = await supabase
    .from("Manual")
    .select(`
      id,
      title,
      published,
      createdAt,
      content,
      author:Profile (
        email
      )
    `)
    .eq("projectId", projectId)
    .eq("published", true)
    .order("createdAt", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Manual取得失敗");
  }

  return data;
};