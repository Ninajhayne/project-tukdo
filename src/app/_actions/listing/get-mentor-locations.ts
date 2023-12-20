//import { ListingCategory, Listing } from "@prisma/client";

import { db } from "@/lib/db";

type GetMentorLocations = {
    //userId: string;
    //listingCategoryId?: string;
};

export const getMentorLocations = async () => {
    try {
        const MentorLocations = await db.listing.findMany({
            where: {
                isListed: true,
            },
            include: {
                listingCategory: true,
                mentor: {
                    select: {
                        imageUrl: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            }
        });
        return MentorLocations;
    } catch (error) {
        console.log("[GET_MENTOR_LOCATIONS]", error);
        return [];
    }
}