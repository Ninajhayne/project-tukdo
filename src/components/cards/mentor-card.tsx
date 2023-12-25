"use client"

import { compactNumber } from "@/lib/utils";
import { MentorWithListing } from "@/types";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { PiMedalFill } from "react-icons/pi";

interface MentorCardProps {
    mentor: MentorWithListing;
    mentorRating: {
        rating: number,
        numOfRatings: number,
    } | null;
    numberOfCourses: number;
};

export function MentorCard({
    mentor,
    mentorRating,
    numberOfCourses, 
}: MentorCardProps) {
    
    return (
        <div className="dark:bg-[#2B2D31] bg-white flex flex-col justify-center p-6 shadow-md rounded-xl">
            <div className="space-y-4 text-center">
                <div className="my-2 space-y-1 flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={mentor.imageUrl}  />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <h2 className="text-l font-bold sm:text-2xl truncate capitalize">
                        {mentor.name}
                    </h2>

                    <p className="px-5 text-xs sm:text-base text-slate-500 flex items-center gap-x-1">
                        <PiMedalFill className="h-4 w-4"/>
                        <span className="text-sm">Tutor</span>
                    </p>

                    <div className="flex h-12 sm:text-sm gap-x-2 pt-2">
                        <div>
                            <p className="font-bold">{compactNumber(mentorRating?.numOfRatings!)}</p>
                            <p>{mentorRating?.numOfRatings === 1 ? 'Review' : 'Reviews'}</p>
                        </div>
                        <Separator orientation="vertical"/>
                        <div>
                            <p className="font-bold">{mentorRating?.rating.toFixed(1)}</p>
                            <p>Rating</p>
                        </div>
                        <Separator orientation="vertical"/>
                        <div>
                            <p className="font-bold">{compactNumber(numberOfCourses)}</p>
                            <p>{numberOfCourses === 1 ? 'Course' : 'Courses'}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};