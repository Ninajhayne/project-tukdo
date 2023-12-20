"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import dynamic from "next/dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

import { Pencil, PlusCircle, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
    loading: () => <Skeleton className="relative aspect-video mt-2"/>
});

interface ChapterVideoFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({ 
    initialData,
    courseId,
    chapterId,
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <Card
            //as="section"
            id="attachment-form-container"
            aria-labelledby="attachment-form-heading"
            className="mt-4"
        >
            <CardContent>
                <div className="font-medium flex items-center justify-between mt-2">
                    Course video
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
                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <Video className="h-10 w-10 text-slate-500"/>
                        </div>
                    ) : (
                        
                        <div className="relative aspect-video mt-2">
                            <div className="absolute inset-0">
                                <ReactPlayer
                                    url={initialData.videoUrl}
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
                            endpoint="chapterVideo"
                            onChange={(url) => {
                                if(url) {
                                    onSubmit({ videoUrl: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Upload the chapter&apos;s video
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