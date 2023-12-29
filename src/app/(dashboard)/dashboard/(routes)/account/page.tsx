import type { Metadata } from "next"
import dynamic from 'next/dynamic';
import Image from "next/image";

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
    title: "Account | TUKDO",
    description: "Manage your account settings",
}

export default function AccountPage() {
    return (
        <Shell variant="sidebar">
            <PageHeader id="account-header" aria-labelledby="account-header-heading" className="rounded-lg shadow-sm bg-[#F2602D] flex items-center gap-x-2">
                <div className="p-6">
                    <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Account</PageHeaderHeading>
                    <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                        Manage your account settings
                    </PageHeaderDescription>
                </div>
                <div className="ml-auto flex-shrink mr-6">
                    <Image
                        src="/images/header/girl.png"
                        alt=""
                        width={100}
                        height={100}
                        className="w-32 h-28 object-cover"
                        loading="lazy"
                    />
                </div>
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
