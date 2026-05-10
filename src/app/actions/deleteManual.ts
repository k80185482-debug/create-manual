"use server"

import { createClient } from "@/lib/supabase/server";

export const deleteManual = async (id: number) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { error } = await supabase
    .from("Manual")
    .delete()
    .eq("id", id)

  if (error) {
    console.log(error);
    throw new Error("Manual取得失敗");
  }
}