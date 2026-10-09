import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
export default function UserNotifications() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                <PopoverHeader>
                    <div>
                        <h3 className="text-sm font-medium leading-none">Notifications</h3>
                    </div>
                </PopoverHeader>
                <Separator />
                <div className="text-sm text-muted-foreground">
                    You have no new notifications.
                </div>
            </PopoverContent>
        </Popover>
    )
}
