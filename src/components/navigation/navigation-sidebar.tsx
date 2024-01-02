import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/layouts/theme-toggle";

import { db } from "@/lib/db";

//import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import Link from "next/link";
//import { Home } from "lucide-react";
import { HomeIcon } from "@radix-ui/react-icons";

export const NavigationSideBar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    };

    const servers = await db.plaza.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-zinc-100 dark:bg-gray-950 py-3">
            {/*
                <NavigationAction/>
            */}
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" 
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <Link href={"/"} className="hover:bg-[#C44D24] hover:text-white h-10 w-10 inline-flex items-center justify-center rounded-md">
                    <HomeIcon
                        className="h-4 w-4"
                    /> 
                </Link>
                <ThemeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[42px] w-[42px]"
                        }
                    }}
                />
            </div>
        </div>
    );
};