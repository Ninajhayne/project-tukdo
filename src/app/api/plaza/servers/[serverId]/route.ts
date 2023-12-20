import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl, } = await req.json();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server =  await db.plaza.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl,
            }
        });

        return NextResponse.json(server);

    } catch(error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        const { userId } = auth();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        //console.log("ServerId:", params.serverId);
        //console.log("MentorId:", userId);

        const server =  await db.plaza.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        });

        const listing = await db.listing.update({
            where: {
                //serverId: params.serverId,
                mentorId: userId,
            },
            data: {
                serverId: null,
            }
        });

        return NextResponse.json(server);
        //return NextResponse.json(listing);
    } catch(error) {
        console.log("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

