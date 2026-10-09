"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { config } from "@/lib/config"
import { logger } from "@/lib/logger"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export default function SignOutButton() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const res = await fetch(`${config.backendUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
        })

        if (!res.ok) {
          const body = await res.text()
          logger.error(`Logout failed: ${res.status} ${body.slice(0, 200)}`)
          setError("Could not log out. Please try again.")
          return
        }

        setOpen(false)
        router.replace("/")
        router.refresh()
      } catch (err) {
        logger.error(err)
        setError("Network error. Please try again.")
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <button type="button" className="w-full text-left">
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to logout.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleLogout}>
            {isPending ? "Logging out..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
