"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"
import { logger } from "@/lib/logger"
import { config } from "@/lib/config"

type IUserData = {
  userName: string
  email: string
  role: string
}

export function UserProfile({ userData }: { userData: IUserData }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    function handleLogout() {
        startTransition(async () => {
            try {
                const res = await fetch(`${config.backendUrl}/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                })
                if (!res.ok) {
                    logger.error(`Logout failed: ${res.status}`)
                    return
                }
                router.replace("/")
                router.refresh()
            } catch (err) {
                logger.error(err)
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-accent transition-colors outline-none">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/elena.jpg" alt={userData?.userName} />
                        <AvatarFallback>
                            {userData?.userName?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden md:flex flex-col items-start text-sm leading-tight">
                        <span className="font-medium">{userData?.userName}</span>
                        <span className="text-xs text-muted-foreground">{userData?.role}</span>
                    </div>

                    <ChevronsUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userData?.userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userData?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    disabled={isPending}
                    onSelect={handleLogout}
                >
                    {isPending ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
