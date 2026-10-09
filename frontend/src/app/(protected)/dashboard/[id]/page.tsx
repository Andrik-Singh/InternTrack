import { returnPayload } from "@/lib/server/dal";
import { redirect } from "next/navigation";

export default async function DashboardPage({ params }: {
  params: Promise<{
    "id": string;
  }>
}) {
  const { id } = await params
  const payload = await returnPayload()
  if(!payload) redirect("/")
  if(payload.role.toLocaleLowerCase()!== id.toLocaleLowerCase()) redirect("/")
  return (
    <div>
      {payload.role}
    </div>
  )
}
