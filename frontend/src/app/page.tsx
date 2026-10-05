'use client'
import { Button } from "@/components/ui/button";
import { config } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button
        onClick={async () => {
          try {
            await fetch(`${config.backendUrl}/companies/check`, {
              credentials: 'include',
            })
          } catch (err) {
            console.error(err)
          }
        }}
      >Check cookies</Button>
      <Button
        onClick={async () => {
          try {
            await fetch(`${config.backendUrl}/companies/delete`, {
              credentials: 'include',
            })
          } catch (err) {
            console.error(err)
          }
        }}
      >delete cookies</Button>
      <Link href="/dashboard">
        Dashboard
      </Link>
      Hello
    </div>
  )
}
