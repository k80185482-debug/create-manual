import { getAllManual } from "@/app/actions/getAllManual";
import Link from "next/link";

export default async function Page() {

  const manuals = await getAllManual()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        手順書一覧
      </h1>
      <div className="space-y-4">
        {manuals.map((manual) => (
          <Link
            key={manual.id}
            href={`/manage/posts/revise/${manual.id}`}
          >
            <div className="border p-4 rounded space-y-2 hover:bg-gray-50">
              <h2 className="text-xl font-bold">
                {manual.title}
              </h2>
              <h2 className="text-l font-bold">
                目的: {manual.content.purpose}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}