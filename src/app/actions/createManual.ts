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

export const createManual = async (Manualdata: FormData) => {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();
  console.log(Manualdata)

  if (!user) {
    throw new Error("ログインしてません")
  }

  const { error } = await supabase.from ("Manual").insert(
    {
      projectId: Manualdata.Project,
      title: Manualdata.title,
      content: Manualdata.content,
      published: Manualdata.published,
      authorId: user.id
    }
  )

  if (error) {
    console.log(error)
    throw new Error("保存に失敗しました");
  }
}