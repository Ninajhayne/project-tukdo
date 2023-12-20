import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        const existingRating = await db.courseRating.findUnique({
            where: {
                userId_courseId: {
                    courseId: courseId,
                    userId: userId,
                },
            },
        });

        if (existingRating) {
            return new NextResponse("You've already rated this course.", { status: 400 });
        }

        // Retrieve the current averageRating value
        const course = await db.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                averageRating: true,
                numOfRatings: true,
            },
        });

        if (!course) {
            return new NextResponse("Course not found.", { status: 404 });
        }

        // Calculate the new averageRating
        const newAverageRating = (
            (course.averageRating * course.numOfRatings) + values.rating
        ) / (course.numOfRatings + 1);

        const newRating = newAverageRating / (course.numOfRatings + 1);

        const courseRating = await db.courseRating.create({
            data: {
                userId,
                courseId,
                rating: values.rating,
                description: values.description,
            }
        });

        // Update the course with the new averageRating and increment numOfRatings
        await db.course.update({
            where: {
                id: courseId,
            },
            data: {
                numOfRatings: {
                    increment: 1,
                },
                averageRating: newAverageRating,
                rating: newRating,
            },
        });

        return NextResponse.json(courseRating);
    } catch (error) {
        console.log("[POST_COURSE_RATING_COURSE_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const originalCourseRating = await db.courseRating.findUnique({
            where: {
              userId_courseId: {
                courseId: courseId,
                userId: userId,
              },
            },
            select: {
              rating: true,
            },
        });

        //console.log("Original Course Rating:", originalCourseRating?.rating);
        //console.log("Values Rating:", values.rating);

        if (!originalCourseRating) {
            return new NextResponse("Course rating not found", { status: 404 });
        };

        const courseRating = await db.courseRating.update({
            where: {
                userId_courseId: {
                    courseId: courseId,
                    userId: userId,
                },
            },
            data: {
                ...values,
            }
        });

        const course = await db.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                averageRating: true,
                numOfRatings: true,
            },
        });

        if (!course) {
            return new NextResponse("Course not found.", { status: 404 });
        }

        const newAverageRating = originalCourseRating
        ? course.averageRating - originalCourseRating.rating! + values.rating
        : course.averageRating - 0 + values.rating;

        const newRating = newAverageRating / course.numOfRatings;

        await db.course.update({
            where: {
                id: courseId,
            },
            data: {
              	averageRating: newAverageRating,
				rating: newRating,
            },
        });

        /*
        await db.course.update({
            where: {
              id: courseId,
            },
            data: {
              averageRating: {
                decrement: originalCourseRating.rating || 0,
                //increment: values.rating || 0,
              },
            },
        });

        await db.course.update({
            where: {
              id: courseId,
            },
            data: {
              averageRating: {
                //decrement: originalCourseRating.rating || 0,
                increment: values.rating || 0,
              },
            },
        });
        */
        

        return NextResponse.json(courseRating);
    } catch (error) {
        console.log("[PATCH_COURSE_RATING_COURSE_ID]", error);
        return new NextResponse("Internal Server Error", {status:500});
    }
}