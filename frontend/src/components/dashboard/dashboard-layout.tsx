import { AppSidebar } from "@/components/dashboard/app-sidebar"
import Navbar from "@/components/dashboard/navbar/navbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getUserData } from "@/lib/server/user"
import { redirect } from "next/navigation"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default async  function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getUserData()
  if(!user) redirect("/sign-in")
    return (
        <SidebarProvider>
        <AppSidebar role={user.role} userName={ user.userName} />

            <SidebarInset>
                <Navbar />
                <div className="flex-1 p-4 md:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
