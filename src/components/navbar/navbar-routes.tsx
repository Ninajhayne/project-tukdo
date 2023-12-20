"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";

import { UserButton } from "@clerk/nextjs";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="flex gap-x-2 ml-auto">
                <Link href="/courses">
                    <Button size="sm" variant="ghost">
                        <LogOut
                            className="h-4 w-4 mr-2"
                        />
                        Exit
                    </Button>
                </Link>
                <UserButton 
                    afterSignOutUrl="/"
                />
            </div>
        </>
    )
}