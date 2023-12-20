import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
export function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                        <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>More...</span>
                        </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  