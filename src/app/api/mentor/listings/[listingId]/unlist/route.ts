import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        const { userId } = auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const listing = await db.listing.findUnique ({
            where: {
                id: params.listingId,
                mentorId: userId,
            },
        });

        if(!listing) {
            return new NextResponse("Unauthorized", {status:401});
        }

        const unlistedProfile = await db.listing.update({
            where: {
                id: params.listingId,
                mentorId: userId,
            },
            data: {
                isListed: false,
            }
        });

        return NextResponse.json(unlistedProfile);
    } catch (error) {
        console.log("[LISTING_ID_UNLIST]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    };
}