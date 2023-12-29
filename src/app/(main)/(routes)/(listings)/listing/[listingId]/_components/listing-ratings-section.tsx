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
            <h2 className="line-clamp-1 text-xl sm:text-2xl font-bold mb-4">Tutor Reviews</h2>
                <div className="flex items-center text-center justify-center text-xl space-x-3">

                    <p className="text-5xl">
                    {!listing.rating
                        ? "0"
                        : listing.rating.toFixed(1)}
                    </p>
                    <div className="px-1 text-base font-semibold">
                        <p>Out of</p>
                        <p>5 Stars</p>
                    </div> 
                    <span className="text-[#FFE600] text-4xl">★★★★★</span> 
                </div>
                
                <div className="items-center text-center text-muted-foreground text-sm mt-3 mb-4">
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