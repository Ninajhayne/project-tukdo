"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
    loading: () => <Skeleton className="relative aspect-video w-full h-[200px] md:h-[400px] lg:h-[400px] xl:h-[440px]" />
});

//import ReactPlayer from "react-player";

interface MentorIntroPlayerProps {
    videoUrl: string;
};

export const MentorIntroPlayer = ({
    videoUrl,
} : MentorIntroPlayerProps) => {

    return (
        <div className="relative aspect-video w-full h-[200px] md:h-[400px] lg:h-[400px] xl:h-[440px]">
            <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                //onCanPlay={() => setIsReady(true)}
                //onEnded={onEnd}
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
    );
};