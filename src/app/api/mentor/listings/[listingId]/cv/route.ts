import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { listingId: string }}
) { 
    try {
        const { userId } = auth();
        const { url } = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const listingOwner = await db.listing.findUnique({
            where: {
                id: params.listingId,
                mentorId: userId,
            }
        });

        if(!listingOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingCV = await db.cV.findMany({
            where: {
                listingId: params.listingId,
            }
        });
    
        if (existingCV.length > 0) {
            return new NextResponse("CV already exists", { status: 401 });
        }

        const cv = await db.cV.create({
            data: {
                url,
                name: url.split("/").pop(),
                listingId: params.listingId,
            }
        });

        return NextResponse.json(cv);

    } catch (error) {
        console.log("[CV_ID_ATTACHMENTS]", error);
        return new NextResponse("Internal Server Error", { status: 500});
    }
}