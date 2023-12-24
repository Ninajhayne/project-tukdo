import type { Users } from "@/types"

export const tukdoUsers = [
    {
        title: "FOR TUTOR",
        buttonTitle: "Start a Class Today",
        image: "/images/tutor.png",
        href: "/become-a-mentor",        
    },
    {
        title: "FOR LEARNER",
        buttonTitle: "Join a Class",
        image: "/images/learner.png",
        href: "/courses"        
    },
] satisfies Users[]
