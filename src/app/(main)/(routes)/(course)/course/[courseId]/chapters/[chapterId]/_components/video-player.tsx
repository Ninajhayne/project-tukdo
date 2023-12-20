"use client";

import axios from "axios";
//import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//import { Loader2, Lock } from "lucide-react";
import { Lock } from "lucide-react";

import { useConfettiStore } from "@/hooks/use-confetti-store";


import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
});

//import ReactPlayer from "react-player";

interface VideoPlayerProps {
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;

    videoUrl: string;
};

export const VideoPlayer = ({
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    
    videoUrl,
}:VideoPlayerProps) => {
    //const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();
  
    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });
        
                if (!nextChapterId) {
                    confetti.onOpen();
                }
        
                toast.success("Progress updated");
                router.refresh();
        
                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch {
            toast.error("Something went wrong");
        };
    };
    
    return (
        <div className="relative aspect-video w-full h-[200px] md:h-[400px] lg:h-[400px] xl:h-[440px]">
            
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1E1F22] flex-col gap-y-2 text-[#F0EFE9]">
                    <Lock className="h-8 w-8 animate-pulse"/>
                    <p className="text-sm">
                        This chapter is locked.
                    </p>
                </div>
            )}
            {!isLocked && (
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    //onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
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
            )}
        </div>
    );
};

/*
{!isReady && !isLocked && (
    <div className="absolute inset-0 flex items-center justify-center bg-[#1E1F22]">
        <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
    </div>
)}
*/