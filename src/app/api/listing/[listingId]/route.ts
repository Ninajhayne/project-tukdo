import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
//import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        //const { userId } = auth();
        const profile = await currentProfile();
        const { listingId } = params;
        const { reservationDate, totalPrice } = await req.json();

        //console.log("Profile:", profile);
        //return;
        /*
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        */

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        // Find the listing by ID
        const listing = await db.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                mentor: true,
            },
        });

        if (!listing) {
            return new NextResponse("Listing not found", { status: 404 });
        }

        // Check if the listing's mentorId matches the user's ID
        /*
        if (listing.mentorId === userId) {
            return new NextResponse("Not possible", { status: 400 });
        };

        const reservation = await db.reservation.create({
            data: {
                userId,
                listingId,
                startDate: reservationDate.from,
                endDate: reservationDate.to,
                totalPrice,
            }
        })
        */

        if (listing.mentorId === profile.userId) {
            return new NextResponse("Not possible", { status: 400 });
        };

        const reservation = await db.reservation.create({
            data: {
                userId: profile.id,
                listingId,
                startDate: reservationDate.from,
                endDate: reservationDate.to,
                totalPrice,
            }
        })

        return NextResponse.json(reservation);
    } catch (error) {
        console.log("[RESERVATION_LISTING_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        //const { userId } = auth();
        const profile = await currentProfile();
        const { listingId } = params;
        const { reservationDate, totalPrice, expirationStatus } = await req.json();

        /*
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        */

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const updatedReservation = await db.reservation.update({
            where: {
                userId_listingId: {
                userId: profile.id,
                listingId,
            },
},
            data: {
                startDate: reservationDate.from,
                endDate: reservationDate.to,
                approved: false,
                isExpired: expirationStatus,
                totalPrice,
            },
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        console.log("[PATCH_RESERVATION_LISTING_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    };
};

export async function DELETE(
    req: Request,
    { params }: { params: { listingId: string } }
) {
    try {
        //const { userId } = auth();
        const profile = await currentProfile();
        const { listingId } = params;

        /*
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        */

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const deletedReservation = await db.reservation.delete({
            where: {
                userId_listingId: {
                    userId: profile.id,
                    listingId,
                },
            },
        });

        return NextResponse.json(deletedReservation);
    } catch (error) {
        console.log("[DELETE_RESERVATION_LISTING_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    };
};