import Image from "next/image";
import Link from "next/link";

import { Course } from "@prisma/client";

import { formatPrice } from "@/lib/format";
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Icons } from "@/components/icons"

interface  FeaturedCourseCardProps {
    course: Course
}

export const FeaturedCourseCard = ({
    course,
}: FeaturedCourseCardProps) => {

    const renderRatingIcons = (rating: number) => {
        const roundedRating = Math.round(rating * 2) / 2; // Round to one decimal place
        const filledStars = Math.floor(roundedRating);
        const hasHalfStar = roundedRating % 1 !== 0; // Check if roundedRating is not equal to the nearest integer
        const emptyStars = hasHalfStar ? 4 - filledStars : 5 - filledStars;


        const filledIcon = (
            <svg className="block my-auto h-3 w-3 mr-[1px] text-[#FFE600] dark:text-[#FFE600]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="currentColor" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
            </svg>
        );

        const halfFilledIcon = (
            <svg className="block my-auto h-3 w-3 mr-[1px] text-[#FFE600] dark:text-[#FFE600]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true">
                <path  fill="currentColor" d="M288 0c-12.2.1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zm141.9 512c1.1.1 2.1.1 3.2 0h-3.2z"></path>
            </svg>
        );

        const emptyIcon = (
            <svg className="block my-auto h-3 w-3 mr-[1px] text-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="currentColor" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
            </svg>
        );

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <React.Fragment key={`filled-${index}`}>
                        {filledIcon}
                    </React.Fragment>
                ))}
                {hasHalfStar && (
                    <React.Fragment>
                        {halfFilledIcon}
                    </React.Fragment>
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <React.Fragment key={`empty-${index}`}>
                        {emptyIcon}
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <Card
            className="h-full overflow-hidden rounded-sm transition-colors hover:bg-muted/50"
        >
            <Link aria-label={course.title} href={`/course/${course.id}`}>
                <CardHeader className="border-b p-0">
                    <AspectRatio ratio={16 / 9}>
                        {course.imageUrl ? (
                            <Image
                                src={
                                    course.imageUrl
                                }
                                alt={course.title}
                                className="object-cover"
                                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                fill 
                                loading="lazy"
                            />
                        ) : (
                            <div
                                aria-label="Placeholder"
                                role="img"
                                aria-roledescription="placeholder"
                                className="flex h-full w-full items-center justify-center bg-secondary"
                            >
                                <Icons.placeholder
                                    className="h-9 w-9 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                    </AspectRatio>
                </CardHeader>
                <span className="sr-only">{course.title}</span>
                <CardContent className="grid gap-1.5 p-4">
                    <CardTitle className="line-clamp-1 text-base">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 flex flex-col">
                        <span>
                            {!course.rating ? (
                                <span className="text-sm md:text-xs text-muted-foreground my-auto">
                                    No reviews
                                </span>
                            ) : (
                                <span className="flex mt-1">
                                    {renderRatingIcons(course.rating)} 
                                    <span className="ml-1 text-sm md:text-xs text-muted-foreground my-auto">
                                    {course.rating.toFixed(1)} Rating 
                                    </span>
                                </span>
                            )}
                        </span>
                        <span className="text-base font-medium text-[#F2602D]"> 
                            {!course.price ? "Free" : `${formatPrice(course.price)}`}
                        </span>
                    </CardDescription>
                </CardContent>
            </Link>
        </Card>
        
    );
};

/*
<Link href={`/course/${course.id}`}>
    <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
                fill
                className="object-cover"
                alt={course.title}
                src={course.imageUrl!}
            />
        </div>
        <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium truncate">
                {course.title}
            </div>
            <div>
                <p className="font-medium">
                    {!course.averageRating ? "" : `★ ${course.averageRating / course.numOfRatings}`}
                </p>
                <p className="text-md md:text-sm font-meduim text-slate-400"> 
                    {!course.price ? "Free" : `${formatPrice(course.price)}`}
                </p>
            </div>
        </div>
    </div>
</Link>
*/

