import { getManualById } from "@/app/actions/getManualById";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type ImageItem = {
  image?: File[];
  image_path?: string;
  image_url?: string | null;
};

type Content = {
  title?: string;
  body: string;
} & ImageItem;


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
      {data.content.materials.map((t: Content,i:number)=>(
        <div key={i}>
          <p>{t.body}</p>
          {t.image_url && (
            <Image
              src={t.image_url}
              alt=""
              width={300}
              height={200}
              className="object-cover"
            />
          )}
        </div>
      ))}

      <h2>使用するもの</h2>
      {data.content.term.map((t: Content,i:number)=>(
        <div key={i}>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
          {t.image_url && (
            <Image
              src={t.image_url}
              alt=""
              width={300}
              height={200}
              className="object-cover"
            />
          )}
        </div>
      ))}

      <h2>注意事項</h2>
      <ul>
        {data.content.precaution.map((p: Content,i:number)=>(
          <div key={i}>
            <li>{p.body}</li>
            {p.image_url && (
              <Image
                src={p.image_url}
                alt=""
                width={300}
                height={200}
                className="object-cover"
              />
            )}
          </div>
          
        ))}
      </ul>

      <h2>作業手順</h2>
      {data.content.steps.map((s: Content,i:number)=>(
        <div key={i}>
          <h3>{i+1}. {s.title}</h3>
          <p>{s.body}</p>
          {s.image_url && (
            <Image
              src={s.image_url}
              alt=""
              width={300}
              height={200}
              className="object-cover"
            />
          )}
        </div>
      ))}
    </>
  );
}