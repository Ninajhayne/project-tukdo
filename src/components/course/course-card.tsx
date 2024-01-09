import Image from "next/image";
import Link from "next/link";

//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import React from "react";

import { CourseProgress } from "./course-progress";

import { BookOpen } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
    rating: number;
    numOfRatings: number;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
    rating,
    numOfRatings,
}:CourseCardProps) => {

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
        <Link href={`/course/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                    />
                    {/*
                        <div
                            className="absolute bottom-0 left-0 ml-2 mb-1"
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    */}
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-x-2">
                        <p className="text-lg md:text-base font-medium line-clamp-2">
                            {title}
                        </p>
                    </div>

                    {/*
                     <div className="flex flex-col gap-x-2 justify-between">
                        <div className="flex items-center gap-x-2">
                            <p className="text-lg md:text-base font-medium line-clamp-2">
                                {title}
                            </p>
                            <p className="ml-auto flex-shrink-0">
                                {!rating ? "" : <span><span className="text-[#FFE600]">★</span> {rating.toFixed(1)}</span>}
                            </p>
                        </div>
                    </div>
                    */}
                    
                    <div className="flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-muted-foreground">
                            <p className="text-xs px-2 rounded-md  bg-transparent text-[#00528A] border border-[#00528A] hover:bg-accent">
                                {category}
                            </p>
                        </div>
                    </div>
{/*
                    <div className="text-lg md:text-base font-medium truncate">
                        {title}
                    </div>
                    <p className="text-xs px-2 rounded-md  bg-transparent text-[#00528A] border border-[#00528A] hover:bg-accent">
                        {category}
                    </p>

                    */}
                    <div className="flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-muted-foreground space-x-1">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>                            
                    </div>
                    {!rating ? (
                        <span className="text-sm md:text-xs text-muted-foreground my-auto">
                            No reviews
                        </span>
                    ) : (
                        <span className="flex mt-1">
                            {renderRatingIcons(rating)} 
                            <span className="ml-1 text-sm md:text-xs text-muted-foreground my-auto">
                               {rating.toFixed(1)} Rating 
                            </span>
                        </span>
                    )}

                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                        <div>
                            {/*
                            <p className="font-medium">
                                {!rating ? "" : `★ ${rating.toFixed(1)}`}
                            </p>
                            */}
                            <p className="text-lg font-bold text-[#F2602D]"> 
                                {!price ? "Free" : `${formatPrice(price)}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

