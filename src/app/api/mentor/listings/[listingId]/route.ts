import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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

        const listing = await db.listing.update({
            where: {
                id: listingId,
                mentorId: userId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.log("[LISTING_ID]", error);
        return new NextResponse("Internal Server Error", {status:500});
    }
}