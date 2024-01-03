//import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "../current-profile";

interface GetMyReservationProps {
    listingId: string;
}

export const getMyReservation = async ({
    listingId,
}: GetMyReservationProps) => {
    //const {userId} = auth();
    /*
    if(!userId) {
        return null;
    }
    */

    const profile = await currentProfile();

    if(!profile) {
        return null;
    }

    const myReservation = await db.reservation.findUnique({
        where: {
            userId: profile.id,
            listingId,
        }
    });

    return myReservation;
}