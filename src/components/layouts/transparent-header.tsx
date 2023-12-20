import Link from "next/link"
//import type { User } from "@clerk/nextjs/server"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
/*
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
*/
//import { CartSheet } from "@/components/cart/cart-sheet"
//import { CoursesCombobox } from "@/components/combo-box"
//import { Icons } from "@/components/icons"
//import { MainNav } from "@/components/layouts/main-nav"
import { MobileNav } from "@/components/layouts/mobile-nav"

export function TransparentHeader() {
  return (
    <header className="top-0 z-50 w-full bg-transparent">
      <div className="px-6 flex h-16 items-center">
        <Link
            aria-label="Home"
            href="/"
            className="hidden items-center space-x-2 lg:flex text-white text-2xl"
        >
            <span className="hidden font-bold lg:inline-block">
                {siteConfig.name}
            </span>
        </Link>
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
      </div>
    </header>
  )
}
