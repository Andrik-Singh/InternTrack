import { SidebarTrigger } from "../../ui/sidebar";
import SearchCommand from "./searchCommand";

export default function Navbar() {
  return (
    <header>
      <section>
        <SidebarTrigger />
      </section>
      <section>
        <SearchCommand />
      </section>
    </header>
  );
}
