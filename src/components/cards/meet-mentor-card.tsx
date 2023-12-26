"use client";

//import { db } from "@/lib/db"
//import { cn } from "@/lib/utils"
//import { useState } from "react";
//import { Listing, Profile } from "@prisma/client"
import { MentorWithListing } from "@/types";

//import Image from "next/image"
import Link from "next/link"

/*
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
*/

import { Button } from "@/components/ui/button"

import { MentorCard } from "./mentor-card"

interface MeetMentorCardProps {
	mentor: MentorWithListing;
    mentorRating: {
        rating: number,
        numOfRatings: number,
    } | null;
    numberOfCourses: number;
}

export async function MeetMentorCard({ 
    mentor,
    mentorRating,
    numberOfCourses, 
}: MeetMentorCardProps) {
	return (
		<section>
			<h2
                className="line-clamp-1 text-xl sm:text-2xl font-bold mb-4"
            >
                Meet your tutor 
            </h2>
            <div className="max-w-2xl dark:bg-[#00538a36] bg-[#00538a12] rounded-lg shadow-sm p-6">
                <div className="flex flex-col justify-center items-center">
                    <MentorCard
                        mentor={mentor}
                        mentorRating={mentorRating}
                        numberOfCourses={numberOfCourses}
                    />
                    
                    <Button className="mt-4">
                        <Link href={`/listing/${mentor.listing.id}`}>
                            Visit
                        </Link>
                    </Button>
                </div>
            </div>
		</section>
	)
};

/*
<Link href={`/listing/${mentor.listing.id}`}>
    <h1
        className="font-bold text-lg"
    >
        Mentor
    </h1>

    <div className="max-w-2xl bg-base-200 rounded-lg shadow-sm p-6">
        <div className="flex flex-col justify-center items-center">
            
            <MentorCard
                mentorName={mentor.name}
                mentorImageUrl={mentor.imageUrl}
            />
            
            <Preview
                className="p-4 whitespace-pre-wrap break-words"
                value={mentor.listing.description}
            />
        </div>
    </div>
</Link>
*/

/*
<div className="flex flex-row justify-center items-center">
    <div className="w-96 mx-auto shadow-xl">
        <Image
            className="w-24 h-24 mx-auto rounded-full aspect-square"
            src={mentor.imageUrl}
            alt="Mentor"
            height={100}
            width={100}
        />
        <div className="text-center mt-2 text-3xl font-medium">{mentor.name}</div>
        <div className="px-6 text-center mt-2 font-light text-sm">
        <div>
            {mentor.listing.description.length > 250 ? (
                <>
                    <Preview 
                        value={showMore ? (mentor.listing.description ?? '') : (mentor.listing.description? `${mentor.listing.description.substring(0, 250)}...` : '')}
                        className="-ml-4"
                    />

                    <Button
                        size="sm"
                        variant="link"
                        onClick={() => setShowMore(!showMore)}
                        className="-ml-4 underline"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </Button>
                </>
            ) : (
                <Preview 
                    value={mentor.listing.description}
                    className="-ml-4"
                />
            )}
        </div>
        </div>
        <Separator className="my-4"/>
        <div className="flex p-4">
        <div className="w-1/2 text-center">
            <span className="font-bold">4.8</span> Rating
        </div>
        <div className="w-0 border border-gray-300">
            
        </div>
        <div className="w-1/2 text-center">
            <span className="font-bold">12</span> Courses
        </div>
        </div>
    </div>
</div>
*/