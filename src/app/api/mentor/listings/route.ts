import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const { description } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const listing = await db.listing.create({
            data: {
                mentorId: userId,
                description,
            }
        })

        return NextResponse.json(listing);
    } catch (error) {
        console.log("[LISTING]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}