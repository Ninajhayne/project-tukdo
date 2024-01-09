import type { Metadata } from "next"

import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface LobbyLayoutProps {
    children: React.ReactNode
}
   
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "About | TUKDO",
    description: "",
}

export default async function AboutLayout({ children }: LobbyLayoutProps) {

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
