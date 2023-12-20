//"use client";

import { Listing } from "@prisma/client";

import { db } from "@/lib/db";
import { ListingUserRatings } from "@/components/rating/listing/listing-user-ratings";

interface ListingRatingsSectionProps {
    listing: Listing
};

export const ListingRatingsSectionList = async ({
    listing,
}: ListingRatingsSectionProps) => {
    //const { onOpen } = useModal();

    const listingRatings = await db.listingRating.findMany({
        where: {
            listingId: listing.id,
        },
        include: {
            user: true,
        },
        take: 6,  // Limit the number of results to 6
        orderBy: {
            createdAt: 'desc',  // Order by the 'createdAt' field in descending order (latest first)
        },
    });

    return (
        <div>
            <div className="flex items-center font-bold text-sm md:text-xl">
                <p>
                    ★ {!listing.rating ? "No ratings yet" : listing.rating.toFixed(2)}
                </p>

                <p className="px-1">
                    ·
                </p>
                <p>
                    {!listing.numOfRatings ? 'No reviews' :
                    listing.numOfRatings === 1 ? `${listing.numOfRatings} review` :
                    `${listing.numOfRatings} reviews`}
                </p>
            </div>

            <ListingUserRatings
                listingRatings={listingRatings}
            />
            
        </div>

    );
};