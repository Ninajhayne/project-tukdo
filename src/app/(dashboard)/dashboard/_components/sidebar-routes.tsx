"use client";

import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/dashboard/search",
    },
]

const mentorRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/dashboard/mentor/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/dashboard/mentor/analytics",
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isMentorPage = pathname?.includes("/dashboard/mentor");

    const routes = isMentorPage ? mentorRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}