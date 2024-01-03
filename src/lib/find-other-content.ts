import { db } from "@/lib/db";

interface FindOtherContentProps {
    mentorId: string;
    courseId?: string;
    isListing: boolean;
}

export const FindOtherContent = async ({
    mentorId,
    courseId,
    isListing,
}: FindOtherContentProps) => {
    const whereClause: any = {
        userId: mentorId,
        isPublished: true,
    };

    if (courseId && !isListing) {
        whereClause.NOT = {
            id: courseId,
        };
    }

    const otherContents = await db.course.findMany({
        where: whereClause,
        orderBy: [
            {
                rating: 'desc',
            },
            {
                updatedAt: 'desc',
            },
        ],
    });

    return otherContents;
};
