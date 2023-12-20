import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface ExperimentsLayoutProps {
    children: React.ReactNode
}

export default async function ExperimentsLayout({ children }: ExperimentsLayoutProps) {
    try {
        const user = await currentUser();
        return (
            <div className="relative flex min-h-screen flex-col">
                <SiteHeader user={user} />
                    <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        )
    } catch (error) {
        console.log(error);
    }
}
