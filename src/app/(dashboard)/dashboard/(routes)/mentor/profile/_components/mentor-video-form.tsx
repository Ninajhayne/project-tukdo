"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
});

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Listing } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Pencil, PlusCircle, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MentorVideoFormProps {
    initialData: Listing;
    listingId: string;
};

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const MentorVideoForm = ({ 
    initialData,
    listingId,
}: MentorVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/mentor/listings/${listingId}`, values);
            toast.success("Profile updated");
            
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <Card
            //as="section"
            id="tutor-video-form-container"
            aria-labelledby="tutor-video-form-heading"
        >
            <CardContent>
                <div className="font-medium flex items-center justify-between my-2">
                    Intro
                    <Button onClick={toggleEdit} variant="ghost">
                        {isEditing && (
                            <>Cancel</>
                        )}
                        {!isEditing && !initialData.videoUrl && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add
                            </>
                        )}
                        {!isEditing && initialData.videoUrl && (
                            <>
                                <Pencil className="h-4 w-4 mr-2"/>
                                Edit
                            </>
                        )}
                    </Button>
                </div>
                {!isEditing && (
                    !initialData.videoUrl ? (
                        <Skeleton className="flex items-center justify-center h-60 rounded-md">
                            <Video className="h-10 w-10"/>
                        </Skeleton>
                    ) : (
                        
                        <div className="relative aspect-video mt-2">
                            <div className="absolute inset-0">
                                <ReactPlayer
                                    url={initialData?.videoUrl || ""}
                                    controls
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>
                    )
                )}
                {isEditing && (
                    <div>
                        <FileUpload
                            endpoint="mentorProfileVideo"
                            onChange={(url) => {
                                if(url) {
                                    onSubmit({ videoUrl: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Upload this chapter&apos;s video
                        </div>
                    </div>
                )}
                {initialData.videoUrl && !isEditing && (
                    <div className="text-xs text-muted-foreground mt-2 ">
                        Videos can take a few minutes to process. Refresh the page if video does not appear.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};