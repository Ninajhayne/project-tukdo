"use client";

import * as z from "zod";
import axios from "axios";
//import toast from "react-hot-toast";
import { toast } from "sonner";

import { useState } from "react";

import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";


import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";



interface ImageFormProps {
    initialData: Course
    courseId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = ({
    initialData,
    courseId,
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();``

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course Updated");
            
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
            <CardContent className="mt-2">
                <div className="font-medium flex items-center justify-between">
                    Course image
                    <Button onClick={toggleEdit} variant="ghost">
                        {isEditing && (
                            <>Cancel</>
                        )}
                        {!isEditing && !initialData.imageUrl && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add
                            </>
                        )}
                        {!isEditing && initialData.imageUrl && (
                            <>
                                <Pencil className="h-4 w-4 mr-2"/>
                                Edit
                            </>
                        )}
                    </Button>
                </div>
                {!isEditing && (
                    !initialData.imageUrl ? (
                        <div className="flex items-center justify-center h-60 rounded-md">
                            <ImageIcon className="h-10 w-10"/>
                        </div>
                    ) : (
                        <div className="relative aspect-video mt-2">
                            <Image
                                alt="Upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData.imageUrl}
                            />
                        </div>
                    )
                )}
                {isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if(url) {
                                    onSubmit({ imageUrl: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};