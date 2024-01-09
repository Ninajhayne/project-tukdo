//import { auth } from "@clerk/nextjs";

import axios from "axios";
import { db } from "@/lib/db";
import { currentProfile } from "../current-profile";
import { Reservation } from "@prisma/client";

interface GetMyReservationProps {
    listingId: string;
}

const isReservationInPast = (reservation: Reservation): boolean => {
    const currentDate = new Date();
    return new Date(reservation.endDate) < currentDate || new Date(reservation.startDate) < currentDate;
};

export const getMyReservation = async ({
    listingId,
}: GetMyReservationProps) => {
        const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const myReservation = await db.reservation.findUnique({
        where: {
userId_listingId: {
            userId: profile.id,
            listingId,
        },
        },
    });

    if (!myReservation) {
        return null;
    }

    if (isReservationInPast(myReservation)) {
        // Reservation is in the past, delete it
        await db.reservation.delete({
            where: {
                userId_listingId: {
                    userId: profile.id,
                    listingId,
                },
            },
        });

        return null; // Return null as the reservation is deleted
    }

    return myReservation;
};


export const getMyReservations = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const myReservations = await db.reservation.findMany({
        where: {
            userId: profile.id,
        },
    });

    if (!myReservations) {
        return null;
    }

    return myReservations;
};
