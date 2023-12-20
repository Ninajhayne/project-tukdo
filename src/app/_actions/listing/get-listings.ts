//import { ListingCategory, Listing } from "@prisma/client";

import { db } from "@/lib/db";

type GetListings = {
    //userId: string;
    listingCategoryId?: string;
    title?: string;
    price_range?: string;
    pricing?: string;
    mode?: string;
};

export const getListings = async ({
    //userId,
    listingCategoryId,
    price_range,
    mode,
}: GetListings) => {

    try {
        /*
        const listingWithProfile = await db.listing.findMany({
            where: {
                isListed: true,
                listingCategoryId,
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
        */
        const whereCondition: any = {
            isListed: true,
        };

        if (listingCategoryId) {
            whereCondition.listingCategoryId = listingCategoryId;
        }

        // Assuming price_range is in the format "min-max"
        if (price_range) {
            const [minPrice, maxPrice] = price_range.split('-');
            whereCondition.fee = {
                gte: parseFloat(minPrice),
                lte: parseFloat(maxPrice),
            };
        }

        if (mode) {
            whereCondition.mode = decodeURIComponent(mode);
        }

        const listingWithProfile = await db.listing.findMany({
            where: whereCondition,
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
            orderBy: [
                {
                    rating: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        });

        return listingWithProfile;
    } catch (error) {
        console.log("[GET_LISTINGS]", error);
        return [];
    }
}