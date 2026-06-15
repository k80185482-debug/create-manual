"use server";

import { createClient } from "@/lib/supabase/server";

type ProjectProps = {
  id: number;
  name: string;
  content: string;
  authorId: string;
  imageUrl: string | null;
};

export const getProject = async (): Promise<ProjectProps[]> => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてません");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    console.log(error);
    throw error;
  }

  
    console.log(user)

  const projectsWithUrl = await Promise.all(
    data.map(async (project) => {
      if (!project.imageUrl) return project;

      const { data: signedData, error: storageError } =
        await supabase.storage
          .from("ProjectImage")
          .createSignedUrl(project.imageUrl, 60);

      if (storageError) {
        console.log(storageError);
        return project;
      }

      return {
        ...project,
        imageUrl: signedData.signedUrl,
      };
    })
  );

  return projectsWithUrl;
};