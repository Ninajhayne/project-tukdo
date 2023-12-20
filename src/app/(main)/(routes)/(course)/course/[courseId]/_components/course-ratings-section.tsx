//"use client";

import { Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { CourseUserRatings } from "@/components/rating/course-user-ratings";

interface CourseRatingsSectionProps {
    course: Course & {
        chapters: (Chapter)[];
    };
};

export const CourseRatingsSectionList = async ({
    course,
}: CourseRatingsSectionProps) => {
    //const { onOpen } = useModal();

    const courseRatings = await db.courseRating.findMany({
        where: {
            courseId: course.id,
        },
        include: {
            user: true,
        },
        take: 6,  // Limit the number of results to 6
        orderBy: {
            createdAt: 'desc',  // Order by the 'createdAt' field in descending order (latest first)
        },
    });

    return (
        <div>
            <div className="flex items-center font-bold text-xl">
                <p>
                    ★ {!course.rating ? "No ratings yet" : course.rating.toFixed(2)}
                </p>

                <p className="px-1">
                    ·
                </p>
                <p>
                    {!course.numOfRatings ? 'No reviews' :
                    course.numOfRatings === 1 ? `${course.numOfRatings} review` :
                    `${course.numOfRatings} reviews`}
                </p>
            </div>

            <CourseUserRatings
                courseRatings={courseRatings}
            />
            
        </div>

    );
};