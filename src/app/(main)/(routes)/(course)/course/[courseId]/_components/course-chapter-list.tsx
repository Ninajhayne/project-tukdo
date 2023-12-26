"use client";

//import { useState } from "react";
//import { useModal } from "@/hooks/use-modal-store";
import { Chapter, Course } from "@prisma/client";

//import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseChapterListProps {
    course: Course & {
        chapters: (Chapter)[];
    };
};

export const CourseChapterList = ({
    course,
}: CourseChapterListProps) => {
    //const { onOpen } = useModal();

    return (
        <div>
            <h2 className="line-clamp-1 text-xl sm:text-2xl font-bold mb-4">Course Chapters</h2>
            <ScrollArea>
                {course.chapters && course.chapters.map((chapter, index) => (
                    <div key={index} className="w-full pb-1.5 gap-2 flex">
                        <p>{index + 1}.</p>
                        <p>{chapter.title}</p>
                    </div>
                ))}
            </ScrollArea>
            <Separator className="my-4"/>
        </div>
    );
};