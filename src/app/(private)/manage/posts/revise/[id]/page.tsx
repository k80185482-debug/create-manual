import { getManualById } from "@/app/actions/getManualById";
import UpdateManualForm from "@/components/UpdateManualForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }:Props) {

  const { id } = await params;
  const data = await getManualById(Number(id));

  return(
    <UpdateManualForm defaultValues={data}/>
  )
}