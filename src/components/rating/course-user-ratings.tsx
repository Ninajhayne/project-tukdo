"use client";

import React from "react";
//import { useEffect, useState } from "react";

import { formatDateV2 } from "@/lib/utils";
import { CourseRating, Profile } from "@prisma/client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type CourseRatingWithProfile = CourseRating & {
    user: Profile;
};

interface CourseUserRatingProps {
    //courseRatings: CourseRatingWithProfile[];
    courseRatings: CourseRatingWithProfile[];
}

export const CourseUserRatings = ({
    courseRatings,
}: CourseUserRatingProps) => {
    //const { ratings } = courseRatings;

    const renderRatingIcons = (rating: number) => {
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;

        const filledIcon = (
            <svg className="block h-3 w-3 mr-[1px] text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="currentColor" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
            </svg>
        );

        const emptyIcon = (
            <svg className="block h-3 w-3 mr-[1px] text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
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
            {courseRatings.map((ratings: CourseRatingWithProfile) => (
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