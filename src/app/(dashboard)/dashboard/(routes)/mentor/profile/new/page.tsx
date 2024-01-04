import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"
import { db } from "@/lib/db"
import Image from "next/image";

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import MentorOnboardingForm from "../_components/mentor-onboarding-form"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Become a Tutor | TUKDO",
    description: "Share your expertise",
}

export default async function NewStorePage() {
    /*
        const user = await currentUser()

        if (!user) {
            redirect("/signin")
        }
    */

    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const listing = await db.listing.findUnique({
        where: {
            mentorId: userId,
        },
        include: {
            cv: {},
        },
    });

    if(listing) {
        return redirect("/dashboard/mentor/profile");
    }
    /*
    if(!listing) {
        return redirect("/");
    }
    */
    return (
        <Shell variant="sidebar">
            <PageHeader id="billing-header" aria-labelledby="billing-header-heading" className="rounded-lg shadow-sm bg-[#F2602D] flex items-center gap-x-2">
                    <div className="p-6">
                        <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Become a Tutor</PageHeaderHeading>
                        <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                            Explore the exciting world of online tutoring and share your expertise with students everywhere.
                        </PageHeaderDescription>
                    </div>
                    <div className="ml-auto flex-shrink- mr-6">
                        <Image
                            src="/images/header/owl.png"
                            alt=""
                            width={100}
                            height={100}
                            className="w-32 h-28 object-cover"
                            loading="lazy"
                        />
                    </div>
                </PageHeader>
            <Card
                //as="section"
                id="new-store-page-form-container"
                aria-labelledby="new-store-page-form-heading"
            >
                <CardContent>
                    <MentorOnboardingForm/>
                </CardContent>
            </Card>
        </Shell>
    )
}
