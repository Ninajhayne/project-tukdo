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
            <h2 className="line-clamp-1 text-xl sm:text-2xl font-bold mb-4">Course Reviews</h2>

            <div className="flex items-center text-center justify-center text-xl  space-x-3">

                <p className="text-5xl">
                {!course.averageRating
                    ? "0"
                    : (course.averageRating / course.numOfRatings).toFixed(1)}
                </p>
                <div className="px-1 text-base font-semibold">
                    <p>Out of</p>
                    <p>5 Stars</p>
                </div> 
                <span className="text-[#FFE600] text-4xl">★★★★★</span> 
            </div>
            
            <div className="items-center text-center text-muted-foreground text-sm mt-3 mb-4">
                <p>
                    {!course.numOfRatings ? 'No reviews' :
                    course.numOfRatings === 1 ? `${course.numOfRatings} review` :
                    `${course.numOfRatings} reviews`}
                </p>
            </div>
                {/*
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
                */}

            <CourseUserRatings
                courseRatings={courseRatings}
            />
            
        </div>

    );
};