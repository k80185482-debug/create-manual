import { getManualByProject } from "@/app/actions/getManualByProject";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {

  const { id } = await params;
  const manuals = await getManualByProject(Number(id));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        手順書一覧
      </h1>
      <div className="space-y-4">
        {manuals.map((manual) => (
          <Link
            key={manual.id}
            href={`/manage/posts/project/manual/${manual.id}`}
          >
            <div className="border p-4 rounded space-y-2 hover:bg-gray-50">
              <h2 className="text-xl font-bold">
                {manual.title}
              </h2>
              <h2 className="text-l font-bold">
                目的: {manual.content.purpose}
              </h2>
              <p className="text-sm text-gray-500">
                作成日 :
                {new Date(manual.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}