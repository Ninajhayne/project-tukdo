import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface GetChapterProps {
    courseId: string;
};

export const getPurchase = async ({
    courseId,
}: GetChapterProps) => {
    const user = auth();
    const userId = user ? user.userId : null;

    if (!userId) {
        return false;
    }

    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                }
            }
        });

        return purchase;
    } catch (error) {
        console.error("[GET_PURCHASE]", error);
        /*
        return {
            purchase: null,
        };
        */
       return null;
    }
}