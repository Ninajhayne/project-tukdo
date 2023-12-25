
import Image from "next/image";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { toTitleCase } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LatLngExpression } from "leaflet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
//import { currencyFormater } from "@/lib/utils";
//import MentorLocation from "@/components/location/mentor-location";
const MentorLocation = dynamic(() => import("@/components/location/mentor-location"), {
    ssr: false, // Ensure it's not server-side rendered
    loading: () => <Skeleton className="h-[350px]" />,
});


import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ShareLink } from "@/components/share-link/share-link";
import { ListingRatingModal } from "@/components/modals/listing/listing-rating-modal";

import { getMyReservation } from "@/lib/reservation/get-my-reservation";
import { compareListing } from "@/lib/reservation/compare-listing";

import { MentorIntroPlayer } from "./_components/mentor-intro-player";
import { ReservationDateRange } from "./_components/reservation-date-range";
import { ListingDescription } from "./_components/listing-description";
import { MentorAvailability } from "./_components/mentor-availability";
import { ListingRatingsSectionList } from "./_components/listing-ratings-section";


export async function generateMetadata({
    params
}: {
    params: { listingId: string; }
}) {
    const listing = await db.listing.findUnique({
        where: {
            id: params.listingId,
        },
        select: {
            mentor: {
                select: {
                    name: true,
                },
            },
            description: true,
        },
    })
  
    if (!listing) {
        return {}
    }
  
    return {
        title: toTitleCase(listing.mentor.name),
        description: listing.description ?? undefined,
    }
};


const ListingIdPage = async ({
    params
}: {
    params: { listingId: string; }
}) => {
    
    const { userId } = auth();
    
    const mentorListing = await db.listing.findUnique({
        where: {
            id: params.listingId,
        },
        include: {
            mentor: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                }
            },
            listingCategory: {
                select: {
                    name: true
                }
            }
        }
    });

    if(!mentorListing) {
        return redirect("/");
    }

    const reservations = await db.reservation.findMany({
        where: {
            listingId: mentorListing.id,
        },
    });
    
    const myReservation = await getMyReservation();
    const disableButton = await compareListing(mentorListing.id);

    const myRating = await db.listingRating.findUnique({
        where: {
            userId_listingId: {
                listingId: params.listingId,
                userId: userId || "",
            },
        },
    });
    
    //console.log("Reservations:", reservations);
    return (
        <div className="flex flex-col md:flex-row w-full p-2">
            <div className="w-full md:w-2/3 p-2 order-2 md:order-1">
                <Breadcrumbs
                    segments={[
                    {
                        title: "Tutors",
                        href: "/listings",
                    },
                    
                    {
                        title: toTitleCase(mentorListing.listingCategory?.name!),
                        href: `/listings?listingCategoryId=${mentorListing.listingCategoryId}`,
                    },
                    {
                        title: "Preview",
                        href: `/listing/${mentorListing.id}`,
                    },
                    
                    ]}
                    className="pb-4"
                />
                <div className="mb-2">
                    <div className="flex flex-col mb-4 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex items-center">
                            <Image
                                alt="Tutor"
                                src={mentorListing.mentor.imageUrl}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-full mr-2"
                            />
                            <div>
                                <h3 className="leading-none">
                                    {mentorListing.mentor.name}
                                </h3>
                                <Badge className="rounded-none">
                                    {mentorListing.mode}
                                </Badge>
                                <p className="text-xs">
                                    {mentorListing.listingCategory?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <MentorAvailability
                        mentorListing={mentorListing}
                        reservations={reservations}
                    />
                    <ListingDescription
                        description={mentorListing.description}
                    />
                    
                </div>

                <section>
                    <h2 className="line-clamp-1 text-2xl font-bold">Intro</h2>
                    <MentorIntroPlayer
                        videoUrl={mentorListing.videoUrl!}
                    />
                </section>
                
                <Separator className="my-4"/>
                
                <section>
                    <h2 className="line-clamp-1 text-2xl font-bold">
                        Content Library
                    </h2>

                </section>

                <Separator className="my-4"/>
                <section>
                    <ListingRatingsSectionList
                        listing={mentorListing}
                    />
                </section>
                <Separator className="my-4"/>
                <section>
                    <h2 className="line-clamp-1 text-2xl font-bold">Location</h2>
                    <MentorLocation
                        location={mentorListing.location as LatLngExpression}
                    />
                </section>
                
                {/*
                
                    <LocationMap
                        location={listing.mentor.location}
                    />
                    <div
                        className="mt-6"
                    >
                        <MeetMentorCard
                            mentorId={listing.mentor._id}
                            user={currentUser}
                        />
                    </div>
                */}
            </div>
            <div className="md:w-1/3 order-1">
                
                {/*
                <ReservationDateRange
                    listing={mentorListing}
                    //@ts-ignore
                    reservations={reservations}
                    myReservation={myReservation}
                    disableButton={disableButton}
                    userId={userId}
                />
                <div className="flex justify-center pt-2">
                    <ShareLink/>
                </div>
                */}
                
                <div /*className="sticky top-20"*/>                        
                    <ReservationDateRange
                        listing={Listing}
                        //@ts-ignore
                        reservations={reservations}
                        myReservation={myReservation}
                        disableButton={disableButton}
                        userId={userId}
                    />
                    <div className="flex justify-center pt-2">
                        <ListingRatingModal
                            initialData={myRating}
                            listingId={mentorListing.id}
                            userId={userId}
                        />
                        <ShareLink/>
                    </div>
                </div>
            </div>
        </div>
    )
};  
 
export default ListingIdPage;