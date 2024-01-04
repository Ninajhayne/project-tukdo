"use client";

import Link from "next/link";
import { Chapter, Course, CourseRating, Purchase } from "@prisma/client";

import {
    Card,
    CardContent,
    //CardDescription,
    CardFooter,
    CardHeader,
    //CardTitle,
} from "@/components/ui/card";
//import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { CourseVideoPreview } from "./course-video-preview";
import { CourseEnrollButton } from "../chapters/[chapterId]/_components/course-enroll-button";
import { CourseRatingModal } from "@/components/modals/course/course-rating-modal";
import { ShareLink } from "@/components/share-link/share-link";

interface CourseSidePreviewProps {
    course: Course & {
        chapters: Chapter[],
    },
    //purchase: Purchase | null,
    //purchase: false | Purchase | { purchase: null };
    purchase: boolean | Purchase | null;
    myRating: CourseRating | null,
    userId: string | null,
}

export const CourseSidePreview = ({
    course,
    purchase,
    myRating,
    userId,
}: CourseSidePreviewProps) => {

    return (
        <Link 
            href={`/course/${course.id}/chapters/${course.chapters[0].id}`}
            className="text-sm"
        >
        <Card className="dark:bg-[#00538a36] bg-[#00538a12]">
            <CardHeader>
                <CourseVideoPreview
                    course={course}
                />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-center items-center">
                    {purchase ? (
                        <Link href={`/course/${course.id}/chapters/${course.chapters[0].id}`}>
                            <Button className="w-full">
                                View
                            </Button>
                        </Link>
                        ) : (
                        <CourseEnrollButton
                            courseId={course.id}
                            price={course.price!}
                            userId={userId}
                        />
                    )}
                    {/*
                    <Link 
                        href={`/course/${course.id}/chapters/${course.chapters[0].id}`}
                        className="text-sm"
                    >
                        Debug: View
                    </Link>
                        */}
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <CourseRatingModal
                    initialData={myRating}
                    courseId={course.id}
                    userId={userId}
                />
                <ShareLink/>
            </CardFooter>
        </Card>
        </Link>


    );
};