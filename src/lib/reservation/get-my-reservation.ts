//import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "../current-profile";

export const getMyReservation = async () => {
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
            userId: profile.id
        }
    });

    return myReservation;
}