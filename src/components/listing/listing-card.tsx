import Image from "next/image";
import Link from "next/link";

//import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { JsonValue } from "@prisma/client/runtime/library";
import { Badge } from "@/components/ui/badge";

import { Dot } from "lucide-react";
import React from "react";

interface ListingCardProps {
    id: string;
    name: string;
    imageUrl: string;
    fee: number | 0;
    email: string;
    description: string;
    location: JsonValue;
    videoUrl: string | null;
    mode: string | null;
    category: string | undefined;
    rating: number;
    numOfRatings: number;
}

export const ListingCard = ({
    id,
    name,
    imageUrl,
    fee,
    email,
    description,
    location,
    mode,
    category,
    rating,
    numOfRatings,
}:ListingCardProps) => {
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
        <Link href={`/listing/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
                
                <div className="flex items-center gap-4">
                    <Image
                        alt="Tutor"
                        src={imageUrl}
                        width={50}
                        height={50}
                        className="h-16 w-16 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-lg font-medium">
                            {name}
                        </h3>
                        <p className="text-xs truncate">
                            {email}
                        </p>
                            <Badge className="rounded-none bg-[#00528a] hover:bg-[#003c8a]">
                            {mode}
                        </Badge>
                        
                    </div>
                </div>

                <div className="mt-4">
                    {/*
                    <p className="mt-1">
                        {description}
                    </p>
                    <p className="text-xs">
                        {category}
                    </p>
                    */}

                    <p className="ml-0.5 font-medium text-[#F2602D]">
                        {fee === 0 ? "Free" : `${formatPrice(fee)} / hour`}
                    </p>

                    {!rating && !numOfRatings ? (
                        <span className="text-sm md:text-xs text-muted-foreground my-auto">
                            No reviews
                        </span>
                    ) : (
                        <span className="flex mt-1">
                            {renderRatingIcons(rating)} 
                            <span className="ml-1 text-sm md:text-xs text-muted-foreground my-auto">
                               {rating.toFixed(1)} Rating 
                            </span>

                            <Dot className="w-4 h-4 mt-1"/>

                            <p className="my-auto text-xs text-muted-foreground">
                                {!numOfRatings ? '' :
                                numOfRatings === 1 ? `${numOfRatings} review` :
                                `${numOfRatings} reviews`}
                            </p>
                        
                        </span>

                    )}
                </div>
            </div>
        </Link>
    );
};

/*
<div className="relative w-full aspect-video rounded-md overflow-hidden">
    <Image
        fill
        className="object-cover"
        alt={name}
        src={imageUrl}
    />
</div>
<div className="flex flex-col pt-2">
    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
        {name}
    </div>
    <p className="text-xs text-muted-foreground">{category}</p>
    <p className="text-md md:text-sm font-medium text-slate-700">
        {fee === 0 ? "Free" : `${formatPrice(fee)}`}
    </p>
</div>
*/