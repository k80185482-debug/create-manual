import ManualList from "@/components/ManualList";

export default function Home() {
  return (
   <div>
    <h1 className='text-3xl font-bold p-8 mb-6'>案件一覧</h1>
    <div>
     <section>
       <ManualList />
     </section>
    </div>
   </div>
   
  );
}