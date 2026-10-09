import { getUserData } from "@/lib/server/user";
import { SidebarTrigger } from "../../ui/sidebar";
import SearchCommand from "./searchCommand";
import UserNotifications from "./userNotificatoin";
import { UserProfile } from "./userProfile";

export default async function Navbar() {
  const userData = await getUserData()
  return (
    <header className="flex h-16  items-center justify-between border-b px-4">
      <section>
        <SidebarTrigger />
      </section>
      <section className="flex items-center gap-4">
        <SearchCommand />
        <UserNotifications />
        <UserProfile userData={ userData} />
      </section>
    </header>
  );
}
