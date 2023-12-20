import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    { params } : { params: { listingId: string, cvID: string }}
) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const listingOwner = await db.listing.findUnique({
            where: {
                id: params.listingId,
                mentorId: userId,
            }
        });

        if(!listingOwner) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        const cv = await db.cV.delete({
            where: {
                listingId: params.listingId,
                id: params.cvID,
            }
        });

        await db.listing.update({
            where: {
                id: params.listingId,
                mentorId: userId,
            },
            data: {
                isListed: false,
            }
        });

        return NextResponse.json(cv);
    } catch (error) {
        console.log("[CV_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}