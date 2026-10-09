import { dashboardLinks } from "@/lib/constants"
import { getUserData } from "@/lib/server/user"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const data = await getUserData()
  if (!data) redirect("/")
  const { role } = data
  const link = dashboardLinks[role]
  redirect(link)
  return (
    <div>
      Dashboard
    </div>
  )
}
