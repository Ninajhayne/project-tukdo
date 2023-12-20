import { db } from "@/lib/db";
//import { auth } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params }: { params: { reservationId: string } }
) {
    try {
        const profile = await currentProfile();
        const { reservationId } = params;
        const values = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the reservation record exists and is associated with the authenticated user
        const existingReservation = await db.reservation.findFirst({
            where: {
                id: reservationId,
            },
        });

        if (!existingReservation) {
            return new NextResponse("Record not found", { status: 404 });
        };

        const mentorPlaza = await db.plaza.findFirst({
            where: {
                profileId: profile.id,
            }
        });

        if (!mentorPlaza) {
            return new NextResponse("Plaza not found", { status: 404 });
        };

        // Check if the user is already a member of the plaza
        const existingMember = await db.member.findFirst({
            where: {
                profileId: values.userId, // User's profile ID
                plazaId: mentorPlaza.id, // Use the plaza ID from the reservation
            },
        });

        console.log("Values:", values);
        console.log("existingMember", existingMember);
        console.log("values user Id",values.userId);
        console.log("values user Id from profile",values.id);
        console.log("profile id", profile.userId);

        // If the user is not a member and isApproved is true, add the user as a member
        if (!existingMember && values.isApproved && values.userId !== profile.id) {
            await db.member.create({
                data: {
                    profile: { connect: { id: values.id } },
                    plaza: { connect: { id: mentorPlaza.id } },
                },
            });
        };

        const updatedReservation = await db.reservation.update({
            where: {
                id: reservationId,
            },
            data: {
                approved: values.isApproved,
            },
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        console.error("[PATCH_LISTING_RESERVATION_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
/*
export async function PATCH(
    req: Request,
    { params }: { params: { reservationId: string } }
) {
    try {
        const { userId } = auth();
        const { reservationId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the reservation record exists and is associated with the authenticated user
        const existingReservation = await db.reservation.findFirst({
            where: {
                id: reservationId,
            },
        });

        if (!existingReservation) {
            return new NextResponse("Record not found", { status: 404 });
        };

        const mentorPlaza = await db.plaza.findFirst({
            where: {
                profileId: userId,
            }
        });

        if (!mentorPlaza) {
            return new NextResponse("Plaza not found", { status: 404 });
        };

        // Check if the user is already a member of the plaza
        const existingMember = await db.member.findFirst({
            where: {
                profileId: userId, // User's profile ID
                plazaId: mentorPlaza.id, // Use the plaza ID from the reservation
            },
        });

        // If the user is not a member and isApproved is true, add the user as a member
        if (!existingMember && values.isApproved) {
            await db.member.create({
                data: {
                    profile: { connect: { id: userId } },
                    plaza: { connect: { id: mentorPlaza.id } },
                },
            });
        };

        const updatedReservation = await db.reservation.update({
            where: {
                id: reservationId,
            },
            data: {
                approved: values.isApproved,
            },
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        console.error("[PATCH_LISTING_RESERVATION_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
*/