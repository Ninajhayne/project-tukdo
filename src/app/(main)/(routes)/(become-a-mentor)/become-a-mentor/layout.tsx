import type { Metadata } from "next"

import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface LobbyLayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Become a tutor | TUKDO",
    description: "Be part of a community where people help people grow.",
}

export default async function BecomeAMentorLayout({ children }: LobbyLayoutProps) {

    try {
        const user = await currentUser();

        return (
            <main>
                {children}
            </main>
        )
    } catch (error) {
        console.log(error);
    }
}
