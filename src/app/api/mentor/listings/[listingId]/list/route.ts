import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params: { listingId: string; } }
) {
    try {
        const { userId } = auth();
        
        if(!userId) {
            return new NextResponse("Unauthorized", {status:401});
        }

        const listing = await db.listing.findUnique({
            where: {
                id: params.listingId,
                mentorId: userId,
            },
            include: {
                cv: {},
            },
        });

        if(!listing) {
            return new NextResponse("Unauthorized", {status:401});
        }

        if(
            !listing.description 
            || !listing.listingCategoryId 
            || !listing.location
            || !listing.mode
            || !listing.videoUrl
            || !listing.serverId
            || !listing.cv[0] 
        ) {
            return new NextResponse("Missing required fields", {status:401});
        }

        const listedProfile = await db.listing.update({
            where: {
                id: params.listingId,
                mentorId: userId,
            },
            data: {
                isListed: true,
            }
        });

        return NextResponse.json(listedProfile);

    } catch (error) {
        console.log("[LISTING_ID_LIST]", error);
        return new NextResponse("Internal Server Error", {status:500});
    };
};