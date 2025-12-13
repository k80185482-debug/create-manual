import ManualList from "@/components/ManualList";
import Link from "next/link";

export default function Home() {
  return (
   <div className="md:flex">
     <section className="w-full md:w-3/4">
       <ManualList />
     </section>
     <aside className="bg-blue-200 w-full md:w-1/4 flex items-center flex-col">
       <Link href="/manual/new">新規作成</Link>
       <Link href="/manual/new">編集</Link>
     </aside>
   </div>
  );
}