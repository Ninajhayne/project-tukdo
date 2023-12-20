"use client";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
});

import { Chapter, Course } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";
//import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import MusicBars from "@/components/@music-bars";
//import { Separator } from "@/components/ui/separator"

interface VideoPreviewModal2Props {
    videoUrl: string;
    course: Course & {
        chapters: (Chapter)[];
    };
};

export const VideoPreviewModal2 = ({
    videoUrl,
    course,
}: VideoPreviewModal2Props) => {
    //const [selectedChapterVideo, setSelectedChapterVideo] = useState<string | null>(course.chapters[0].videoUrl);
    const [selectedChapterVideo, setSelectedChapterVideo] = useState<string | null>(videoUrl);
    const { isOpen, onClose, type } = useModal();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    const isModalOpen = isOpen && type === "videoPreview";
    
    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Course Preview</DialogTitle>
                    <DialogDescription>
                        {course.title}
                    </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-video">
                    <ReactPlayer
                        url={selectedChapterVideo || videoUrl!}
                        controls
                        width="100%"
                        height="100%"
                        config={{
                            file: {
                                attributes: {
                                    controlsList: "nodownload", // disable download button
                                    disablePictureInPicture: true, // disable PIP
                                    playsInline: false,
                                },
                            },
                        }}
                    />
                </div>
                <ScrollArea className="h-[14vh]">
                    {course.chapters &&
                    course.chapters
                        .filter((chapter) => chapter.isFree) // Filter free chapters
                        .map((chapter, index) => 
                    (
                        <button 
                            key={index} 
                            className={`p-2 w-full gap-2 cursor-pointer flex items-center ${
                                chapter.videoUrl === selectedChapterVideo ? 'bg-[#F0EFE9] dark:text-black pointer-events-none' : ''
                            }`}
                            onClick={() => setSelectedChapterVideo(chapter.videoUrl)}
                        >
                            {chapter.videoUrl === selectedChapterVideo && 
                                <MusicBars />
                            }
                            <p className="flex justify-start truncate">
                                {chapter.title}
                            </p>
                        </button>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}