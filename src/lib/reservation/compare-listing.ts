import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

export const compareListing = async (listingId: string) => {
    const {userId} = auth();

    if(!userId) {
        return false;
    }

    const listing = await db.listing.findUnique({
        where: {
            id: listingId,
        },
        select: {
            id: true,
            mentorId: true,
        },
    });

    if (!listing) {
        return true;
    }

    // Check if the listing's mentorId matches the user's ID
    if (listing.mentorId === userId) {
        return true;
    } else {
        return false
    };
}