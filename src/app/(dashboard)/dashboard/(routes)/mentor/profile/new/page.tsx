import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"
import { db } from "@/lib/db"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
    title: "Tutor Onboarding | TUKDO",
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
        <Shell variant="sidebar" className="container">
            <PageHeader
                id="new-tutor-profile-page-header"
                aria-labelledby="new-tutor-profile-page-header-heading"
                className="px-2"
            >
                <PageHeaderHeading size="sm">Tutor Onboarding</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Tutoring is a two-way street. Let us take care of the boring parts so you can concentrate on personal and professional growth for both you and your mentees.
                </PageHeaderDescription>
            </PageHeader>
            <Card
                //as="section"
                id="new-store-page-form-container"
                aria-labelledby="new-store-page-form-heading"
            >
                <CardHeader className="space-y-1">
                </CardHeader>
                <CardContent>
                    <MentorOnboardingForm/>
                </CardContent>
            </Card>
        </Shell>
    )
}
