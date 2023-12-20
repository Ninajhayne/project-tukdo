import type { Step } from "@/types"
import { LogIn, Search, CalendarCheck, MonitorPlay } from "lucide-react"; 


export const tukdoSteps = [
    {    
        title: "1. Sign Up and Profile Creation",
        description: "Register on the online tutoring platform by providing essential credential like email address and password.",
        icon: LogIn,
    },
    {
        title: "2. Browse and Select Preferred Course/ Tutor",
        description: "Explore the different courses and choose your desired tutor from  hundreds of qualified tutors.",
        icon: Search,
    },
    {
        title: "3. Book a Course",
        description: "Select a lesson time and add it to their calendar.",
        icon: CalendarCheck,
    },
    {
        title: "4. Start Learning",
        description: "Access the course and don’t forget to rate your tutor.",
        icon: MonitorPlay,
    },
    
] satisfies Step[]

/*

import { type Icons } from "@/components/icons"

import { BackpackIcon } from "lucide-react"

title: "4. Start Learning",
        description: "Access the course and don’t forget to rate your tutor.",
        icon: Icons.academicsCategory,

        */