"use client";

import React from "react";
//import { useEffect, useState } from "react";

import { formatDateV2 } from "@/lib/utils";
import { ListingRating, Profile } from "@prisma/client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type ListingRatingWithProfile = ListingRating & {
    user: Profile;
};

interface ListingUserRatingProps {
    listingRatings: ListingRatingWithProfile[];
}

export const ListingUserRatings = ({
    listingRatings,
}: ListingUserRatingProps) => {
    //const { ratings } = courseRatings;

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
        <section className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listingRatings.map((ratings: ListingRatingWithProfile) => (
                <article key={ratings.id}>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage 
                                src={ratings.user.imageUrl} 
                                alt="user avatar" 
                            />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 font-medium dark:text-white">
                            <p>{ratings.user.name} <span className="block text-sm text-gray-500 dark:text-gray-400"></span></p>
                        </div>
                    </div>
                    <div className="flex items-center my-2">
                        <span className="flex mt-1">
                            {renderRatingIcons(ratings.rating || 0)}
                        </span>
                        
                        <h3 className="ml-2 mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                            {formatDateV2(ratings.updatedAt, "MMMM yyyy")}
                        </h3>
                        
                    </div>
                    <p className="mb-2">
                        {ratings.description}
                    </p>
                    {/*
                        <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                        <aside>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                            <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                                <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
                                <a href="#" className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Report abuse</a>
                            </div>
                        </aside>
                    */}
                </article>
            ))}
        </section>
        
    );
};