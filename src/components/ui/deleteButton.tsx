"use client";

import { deleteManual } from "@/app/actions/deleteManual";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export function DeleteButton({ id }: Props) {

  const router = useRouter();

  const handleDelete = async () => {
    await deleteManual(id);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
    >
      削除
    </button>
  );
}