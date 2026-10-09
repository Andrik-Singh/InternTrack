import { returnPayload } from "@/lib/server/dal";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await returnPayload()!!
  if(isAuth) redirect('/dashboard')
  return (
    <main  className="bg-sky-50 min-h-screen">
      {children}
    </main>
  );
}
