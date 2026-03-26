import { getManualById } from "@/app/actions/getManualById";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {

  const { id } = await params;
  const data = await getManualById(Number(id));

  return (
    <>
      <h1>{data.title}</h1>

      <h2>目的</h2>
      <p>{data.content.purpose}</p>

      <h2>適応範囲</h2>
      <p>{data.content.applicableRange}</p>

      <h2>用語</h2>
      {data.content.term.map((t,i:number)=>(
        <div key={i}>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </div>
      ))}

      <h2>注意事項</h2>
      <ul>
        {data.content.precaution.map((p,i:number)=>(
          <li key={i}>{p.body}</li>
        ))}
      </ul>

      <h2>作業手順</h2>
      {data.content.steps.map((s,i:number)=>(
        <div key={i}>
          <h3>{i+1}. {s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </>
  );
}