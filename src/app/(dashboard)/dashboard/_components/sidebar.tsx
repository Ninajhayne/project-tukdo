import Link from "next/link"

import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <Link href={"/"} className="p-7">
                <p className="font-bold">
                    Tukdo  
                </p>
            </Link>
            
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}