"use client"

import { createProject } from "@/app/actions/createProject";
import { useState } from "react";

export default function CreateProjectPage() {

  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createProject(name);

    alert("プロジェクト作成しました");
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">

      <h1 className="text-2xl font-bold">
        新しい案件を作成
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">

        <input
          className="w-full border p-2"
          placeholder="案件名"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <button
          type="submit"
          className="border px-4 py-2"
        >
          作成
        </button>

      </form>

    </div>
  );
}