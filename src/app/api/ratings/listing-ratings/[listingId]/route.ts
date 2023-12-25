import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        const { userId } = auth();
        const { listingId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        const existingRating = await db.listingRating.findUnique({
            where: {
                userId_listingId: {
                    listingId: listingId,
                    userId: userId,
                },
            },
        });

        if (existingRating) {
            return new NextResponse("You've already rated this tutor.", { status: 400 });
        }
        
        // Retrieve the current averageRating value
        const listing = await db.listing.findUnique({
            where: {
                id: listingId,
            },
            select: {
                averageRating: true,
                numOfRatings: true,
            },
        });

        if (!listing) {
            return new NextResponse("Listing not found.", { status: 404 });
        }

        // Calculate the new averageRating
        const newAverageRating = (
            (listing.averageRating * listing.numOfRatings) + values.rating
        ) / (listing.numOfRatings + 1);

        const newRating = newAverageRating / (listing.numOfRatings + 1);

        const listingRating = await db.listingRating.create({
            data: {
                userId,
                listingId,
                rating: values.rating,
                description: values.description,
            }
        });

        // Update the listing with the new averageRating and increment numOfRatings
        await db.listing.update({
            where: {
                id: listingId,
            },
            data: {
                numOfRatings: {
                    increment: 1,
                },
                averageRating: newAverageRating,
                rating: newRating,
            },
        });

        return NextResponse.json(listingRating);
    } catch (error) {
        console.log("[POST_LISTING_RATING_LISTING_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        const { userId } = auth();
        const { listingId } = params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const originalListingRating = await db.listingRating.findUnique({
            where: {
              userId_listingId: {
                listingId: listingId,
                userId: userId,
              },
            },
            select: {
              rating: true,
            },
        });

        if (!originalListingRating) {
            return new NextResponse("List rating not found", { status: 404 });
        };

        const listingRating = await db.listingRating.update({
            where: {
                userId_listingId: {
                    listingId: listingId,
                    userId: userId,
                },
            },
            data: {
                ...values,
            }
        });

        const listing = await db.listing.findUnique({
            where: {
                id: listingId,
            },
            select: {
                averageRating: true,
                numOfRatings: true,
            },
        });

        if (!listing) {
            return new NextResponse("Listing not found.", { status: 404 });
        }

        const newAverageRating = originalListingRating
        ? listing.averageRating - originalListingRating.rating! + values.rating
        : listing.averageRating - 0 + values.rating;

        const newRating = newAverageRating / listing.numOfRatings;

        await db.listing.update({
            where: {
                id: listingId,
            },
            data: {
              	averageRating: newAverageRating,
				rating: newRating,
            },
        });
        /*
        await db.listing.update({
            where: {
              id: listingId,
            },
            data: {
              averageRating: {
                decrement: originalListingRating.rating || 0,
              },
            },
        });

        await db.listing.update({
            where: {
              id: listingId,
            },
            data: {
              averageRating: {
                increment: values.rating || 0,
              },
            },
        });
        */

        return NextResponse.json(listingRating);
    } catch (error) {
        console.log("[PATCH_LISTING_RATING_LISTING_ID]", error);
        return new NextResponse("Internal Server Error", {status:500});
    }
}