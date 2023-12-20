"use client";

import Image from "next/image";
import { useModal } from "@/hooks/use-modal-store";
import { Chapter, Course } from "@prisma/client";
import { getFreeChapters } from "@/lib/course/get-free-chapters";

//import { VideoPreviewModal } from "@/components/modals/course/video-preview-modal";
//import { Skeleton } from "@/components/ui/skeleton";

import { VideoPreviewModal2 } from "@/components/modals/course/video-preview-modal-2";

//import { Play } from "lucide-react";
//import { PlayIcon } from "@radix-ui/react-icons";
import { TriangleRightIcon } from "@radix-ui/react-icons";

interface CourseVideoPreviewProps {
    course: Course & {
        chapters: (Chapter)[];
    };
};

export const CourseVideoPreview = ({
    course,
}: CourseVideoPreviewProps) => {
    const { onOpen } = useModal();

    const freeChapters = getFreeChapters(course.chapters);

    if(!freeChapters || freeChapters.length === 0) {
        return (
            <div className="shadow-lg rounded-lg overflow-hidden">
                <Image 
                    className="w-full h-40 object-cover object-center"
                    src={course.imageUrl!}
                    height={225}
                    width={225}
                    loading="eager"
                    alt="Course Thumbnail"
                />  
            </div>
        )
    } else {
        return (
            <>
                <VideoPreviewModal2
                    videoUrl={freeChapters[0].videoUrl!}
                    course={course}
                />

                <div className="shadow-lg rounded-lg overflow-hidden">
                    <div 
                        className="relative aspect-video transition duration-300 ease-in-out hover:scale-110"
                        onClick={() => onOpen("videoPreview")}
                    >
                        <Image
                            fill
                            className="object-cover"
                            src={course.imageUrl!}
                            alt="Course Thumbnail"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-8 w-8 bg-black bg-opacity-50 items-center justify-center rounded-full">
                                <TriangleRightIcon className="text-slate-200 h-8 w-8"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            
        );
    }
    
    
};

/*
<VideoPreviewModal2
    videoUrl={freeChapters[0].videoUrl!}
    course={course}
/>

<VideoPreviewModal
    title={course.title}
    videoUrl={course.chapters[0].videoUrl}
    imageUrl={course.imageUrl!}
/>

{course.chapters[0] && course.chapters[0].videoUrl && course.chapters[0].isFree ? (
    <div 
        className="relative aspect-video transition duration-300 ease-in-out hover:scale-110"
        onClick={() => onOpen("videoPreview")}
    >
        <Image
            fill
            className="object-cover"
            src={course.imageUrl!}
            alt="Course Thumbnail"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 bg-black bg-opacity-50 items-center justify-center rounded-full">
                <Play className="text-slate-200 h-6 w-6 ml-1"/>
            </div>
            
        </div>
    </div>
) : (
    <>
        <Image 
            className="w-full h-40 object-cover object-center"
            src={course.imageUrl!}
            height={225}
            width={225}
            loading="eager"
            alt="Course Thumbnail"
        />
    </>
)}
*/