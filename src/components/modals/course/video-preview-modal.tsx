"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
});

import { useModal } from "@/hooks/use-modal-store";

//import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Play } from "lucide-react";

interface VideoPreviewModalProps {
    title: string;
    videoUrl: string | null;
    imageUrl: string;
};

export const VideoPreviewModal = ({
    title,
    videoUrl,
    imageUrl,
}: VideoPreviewModalProps) => {
    const { isOpen, onClose, type, onOpen } = useModal();

    const isModalOpen = isOpen && type === "videoPreview";
    
    const handleClose = () => {
        onClose();
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <div className="relative aspect-video transition duration-300 ease-in-out hover:scale-110">
                    <Image
                        fill
                        className="object-cover"
                        src={imageUrl}
                        alt="Course Thumbnail"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="text-white h-6 w-6"/>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Course Preview</DialogTitle>
                    <DialogDescription>
                        {title}
                    </DialogDescription>
                </DialogHeader>
                    <div className="relative aspect-video">
                        <ReactPlayer
                            url={videoUrl || undefined}
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
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

