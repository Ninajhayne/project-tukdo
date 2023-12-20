"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

interface myCourseRatingProps {
    courseId: string;
}

export const myCourseRating = async ({
    courseId,
}: myCourseRatingProps) => {
    const { userId } = auth();

    if(!userId) {
        return null;
    }

    const rating = await db.courseRating.findUnique({
        where: {
            userId_courseId: {
                courseId: courseId,
                userId: userId,
            },
        },
    });

    return rating;
}