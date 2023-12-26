"use client";

import { useState } from "react";
import { Chapter, Course } from "@prisma/client";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
//import { Preview } from "@/components/text-editor/preview";
import { Separator } from "@/components/ui/separator";

interface CourseDescriptionProps {
    course: Course & {
        chapters: (Chapter)[];
    };
    mentorName: string;
    mentorImageUrl: string;
};

export const CourseDescription = ({
    course,
    mentorName,
    mentorImageUrl,
}: CourseDescriptionProps) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="mb-4">
            {course.description!.length > 250 ? (
                <>
                    {/*
                    <Preview 
                        value={showMore ? (course.description ?? '') : (course.description ? `${course.description.substring(0, 250)}...` : '')}
                        className="-ml-4"
                    />
                    */}
                    {showMore ? (
                        <p>{course.description}</p>
                    ) : (
                        <p>{course.description!.substring(0, 250)}...</p>
                    )}

                    <Button
                        size="sm"
                        variant="link"
                        onClick={() => setShowMore(!showMore)}
                        className="-ml-3 underline"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </Button>
                </>
            ) : (
                
                <p>{course.description}</p>
            )}
            <Separator className="my-4"/>
            
            <div className="flex justify-between items-center gap-x-2">
                <div className="flex-1 order-2">
                    <div className="text-sm">
                        Created by
                        {"\u00a0"}
                        <span className="underline">{mentorName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <p>Last Updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="order-1">
                    <Avatar>
                        <AvatarImage src={mentorImageUrl} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <Separator className="my-4"/>
        </div>
    );
};

/*
<Preview 
    value={course.description!}
    className="-ml-4"
/>
*/

