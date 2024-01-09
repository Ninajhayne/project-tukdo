//"use client";

import { Listing } from "@prisma/client";

import { db } from "@/lib/db";
import { ListingUserRatings } from "@/components/rating/listing/listing-user-ratings";
import React from "react";

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

    const renderRatingIcons = (rating: number) => {
        const roundedRating = Math.round(rating * 2) / 2; // Round to one decimal place
        const filledStars = Math.floor(roundedRating);
        const hasHalfStar = roundedRating % 1 !== 0; // Check if roundedRating is not equal to the nearest integer
        const emptyStars = hasHalfStar ? 4 - filledStars : 5 - filledStars;


        const filledIcon = (
            <svg className="block my-auto h-7 w-7 mr-[1px] text-[#FFE600] dark:text-[#FFE600]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="currentColor" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
            </svg>
        );

        const halfFilledIcon = (
            <svg className="block my-auto h-7 w-7 mr-[1px] text-[#FFE600] dark:text-[#FFE600]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true">
                <path  fill="currentColor" d="M288 0c-12.2.1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zm141.9 512c1.1.1 2.1.1 3.2 0h-3.2z"></path>
            </svg>
        );

        const emptyIcon = (
            <svg className="block my-auto h-7 w-7 mr-[1px] text-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="currentColor" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
            </svg>
        );

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <React.Fragment key={`filled-${index}`}>
                        {filledIcon}
                    </React.Fragment>
                ))}
                {hasHalfStar && (
                    <React.Fragment>
                        {halfFilledIcon}
                    </React.Fragment>
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <React.Fragment key={`empty-${index}`}>
                        {emptyIcon}
                    </React.Fragment>
                ))}
            </>
        );
    };

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
                    <span className="flex">
                        {renderRatingIcons(listing.rating)} 
                    </span> 
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