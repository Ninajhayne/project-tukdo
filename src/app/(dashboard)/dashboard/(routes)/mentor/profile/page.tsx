
import type { Metadata } from "next"

import dynamic from 'next/dynamic';
//import { Header } from "@/components/header"
//import { Shell } from "@/components/shells/shell"
//import { UserProfile } from "@/components/user-profile"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import Image from "next/image"


import { db } from "@/lib/db";

import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton";
//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

//import { Button, buttonVariants } from "@/components/ui/button"

//import MentorProfileDashboard from "./_components/mentor-profile";
//import Link from "next/link"
//import { cn } from "@/lib/utils"

import { MentorBioForm } from "./_components/mentor-bio-form"
import { MentorProfileCategoryForm } from "./_components/mentor-profile-category-form"
import { MentorProfileActions } from "./_components/mentor-profile-actions"
//import { MentorLocationForm } from "./_components/location-form"
//import MentorLocationForm from "./_components/mentor-location-form";
import { MentorFeeForm } from "./_components/mentor-fee-form"
import { MentorProfileModeForm } from "./_components/mentor-profile-mode-form";
import { MentorVideoForm } from "./_components/mentor-video-form";
import { MentorServerForm } from "./_components/mentor-server-form";
import ProfileEditor from "@/components/account/profile-editor";
import { MentorCVForm } from "./_components/mentor-cv-form";


// Dynamically import the LocationForm component
const MentorLocationForm = dynamic(() => import("./_components/mentor-location-form"), {
    ssr: false, // Ensure it's not server-side rendered
    loading: () => <Skeleton className="aspect-video" />,
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Tutor Profile  | TUKDO",
    description: "Manage your mentor profile",
}

export default async function MentorProfilePage() {

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

    if (!listing) {
        return redirect("/dashboard/mentor/profile/new");
    };

    const categories = await db.listingCategory.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const requiredFields = [
        listing.description,
        listing.listingCategoryId,
        listing.location,
        listing.mode,
        listing.videoUrl,
        listing.serverId,
        listing.cv[0],
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            <PageHeader
                id="dashboard-mentor-profile-page-header"
                aria-labelledby="dashboard-mentor-profile-page-header-heading"
            >
                <div>
                    <div className="flex items-center justify-between">
                        <PageHeader
                            id="mentor-profile-page-header"
                            aria-labelledby="mentor-profile-page-header-heading"
                        >
                            <PageHeaderHeading size="sm">Profile Setup</PageHeaderHeading>
                            <PageHeaderDescription size="sm">
                                Complete all fields {completionText}
                            </PageHeaderDescription>
                        </PageHeader>
                        <MentorProfileActions
                            disabled={!isComplete}
                            listingId={listing.id}
                            isListed={listing.isListed}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Customize your profile
                                </h2>
                            </div>
                            <ProfileEditor/>
                            <MentorBioForm
                                initialData={listing}
                                listingId={listing.id}
                            />
                            <MentorProfileCategoryForm
                                initialData={listing}
                                listingId={listing.id}
                                options={categories.map((category) => ({
                                    label: category.name,
                                    value: category.id,
                                }))}
                            />
                            <MentorProfileModeForm
                                initialData={listing}
                                listingId={listing.id}
                            />
                            <MentorFeeForm
                                initialData={listing}
                                listingId={listing.id}
                            />
                            <MentorVideoForm
                                initialData={listing}
                                listingId={listing.id}
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <h2 className="text-xl mb-4">
                                        Location
                                    </h2>
                                </div>
                                <MentorLocationForm
                                    initialData={listing}
                                    listingId={listing.id}
                                />
                            </div>
                            <div>
                                <MentorServerForm
                                    initialData={listing}
                                    listingId={listing.id}
                                />
                            </div>
                            <div>
                                <MentorCVForm
                                    initialData={listing}
                                    listingId={listing.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
};