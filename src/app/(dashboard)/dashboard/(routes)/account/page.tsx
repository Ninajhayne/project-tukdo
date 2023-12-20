import type { Metadata } from "next"
import dynamic from 'next/dynamic';

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
//import { UserProfile } from "@/components/user-profile"
const UserProfile = dynamic(() => import('@/components/user-profile'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});
import ProfileEditor from "@/components/account/profile-editor"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Account",
    description: "Manage your account settings",
}

export default function AccountPage() {
    return (
        <Shell variant="sidebar">
            <PageHeader id="account-header" aria-labelledby="account-header-heading" className="px-4">
                <PageHeaderHeading size="sm">Account</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Manage your account settings
                </PageHeaderDescription>
            </PageHeader>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <ProfileEditor/>
            </div>
            <section
                id="user-account-info"
                aria-labelledby="user-account-info-heading"
                className="w-full overflow-hidden"
            >
                <UserProfile />
            </section>
        </Shell>
    )
}
