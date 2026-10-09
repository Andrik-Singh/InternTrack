"use client"

import * as React from "react"
import {
    CalculatorIcon,
    CalendarIcon,
    CommandIcon,
    CreditCardIcon,
    Search,
    SettingsIcon,
    SmileIcon,
    UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"

export default function CommandWithGroups() {
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }

        document.addEventListener("keydown", down)
        return () => {
            document.removeEventListener("keydown", down)
        }
    }, [])
    React.useEffect(() => {
        const resetModal = () => {
            setOpen(false)
        }
        window.addEventListener("resize", resetModal)
        return (() => {
            window.removeEventListener("resize", resetModal)
        })
    })
    return (
        <div className="flex flex-col gap-4">
            <Button onClick={() => setOpen(!open)} variant="outline" className="w-fit">
              <div className="flex w-full gap-10 items-center">
                <Kbd><Search /></Kbd>
                <p className="hidden sm:block">Search for anything</p>
                <div className="items-center gap-2 hidden sm:flex">
                  <Kbd>
                    <CommandIcon />
                  </Kbd>
                  <Kbd>K</Kbd>
                </div>
              </div>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>
                                <CalendarIcon />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <SmileIcon />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <CalculatorIcon />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <UserIcon />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCardIcon />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <SettingsIcon />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    )
}
