import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
    price_range?: string;
    pricing?: string;
};

export const getCourses = async ({
    userId,
    title,
    categoryId,
    price_range,
    pricing,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        /*
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true, 
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            
            orderBy: [
                {
                    averageRating: 'desc', // Second sorting field
                },
                {
                  updatedAt: 'desc', // First sorting field
                },
            ],
        });
        */

        const whereCondition: any = {
            isPublished: true,
        };

        if (title) {
            whereCondition.title = {
                contains: title,
            };
        }

        if (categoryId) {
            whereCondition.categoryId = categoryId;
        }

        // Assuming price_range is in the format "min-max"
        if (price_range) {
            const [minPrice, maxPrice] = price_range.split('-');
            whereCondition.price = {
                gte: parseFloat(minPrice),
                lte: parseFloat(maxPrice),
            };
        }

        // Assuming price is a single value
        if (pricing) {
            whereCondition.price = parseFloat(pricing);
        }

        const courses = await db.course.findMany({
            where: whereCondition,
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
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

        const CourseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if(course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    }
                }

                const progressPercentage = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercentage,
                };
            })
        );

        return CourseWithProgress;
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
}

/*
    orderBy: [
        {
            averageRating: 'desc', // Second sorting field
        },
        {
            createdAt: 'desc', // First sorting field
        },
    ],
*/
/*
    orderBy: {
        averageRating: 'desc',
    },
*/