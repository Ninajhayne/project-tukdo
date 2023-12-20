import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
    
    sidebarNav: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "dashboard",
            items: [],
        },
        {
            title: "Account",
            href: "/dashboard/account",
            icon: "user",
            items: [],
        },
        {
            title: "Messages",
            href: "/plaza",
            icon: "at",
            items: [],
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "billing",
            items: [],
        },
        {
            title: "Collections",
            href: "/dashboard/collections",
            icon: "dollarSign",
            items: [],
        },
        {
            title: "Create",
            href: "/dashboard/mentor/courses",
            icon: "list",
            items: [],
        },
        {
            title: "Analytics",
            href: "/dashboard/mentor/analytics",
            icon: "barChart",
            items: [],
        },
        {
            title: "Profile",
            href: "/dashboard/mentor/profile",
            icon: "mentorProfile",
            items: [],
        },
        {
            title: "Calendar",
            href: "/dashboard/mentor/sessions",
            icon: "calendar",
            items: [],
        },
    ],
}

