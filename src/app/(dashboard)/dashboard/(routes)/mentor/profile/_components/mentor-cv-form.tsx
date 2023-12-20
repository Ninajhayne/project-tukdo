"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";

import { CV, Listing } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";

interface MentorCVFormProps {
    initialData: Listing & { cv: CV[] };
    listingId: string;
};

const formSchema = z.object({
    url: z.string().min(1),
});

export const MentorCVForm = ({
    initialData,
    listingId,
}: MentorCVFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();``

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/mentor/listings/${listingId}/cv`, values);
            toast.success("Profile Updated");
            
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);

            await axios.delete(`/api/mentor/listings/${listingId}/cv/${id}`);

            toast.success("Attachment deleted");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setDeletingId(null);
        };
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
                    Provide your CV
                    <Button onClick={toggleEdit} variant="ghost">
                        {isEditing && (
                            <>Cancel</>
                        )}
                        {!isEditing && initialData.cv.length === 0 && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add
                            </>
                        )}
                    </Button>
                </div>
                {!isEditing && (
                    <>
                        { initialData.cv.length === 0 && (
                            <p className="text-sm mt-2 text-slate-500 italic">
                                No CV yet
                            </p>
                        )}
                        {initialData.cv.length > 0 && (
                            <div className="space-y-2">
                                {initialData.cv.map((attachment) => (
                                    <div
                                        key={attachment.id}
                                        className="flex items-center p-3 w-full bg-sky-100 border text-sky-700 rounded-md relative" 
                                    >   
                                        <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                        <p className="text-xs line-clamp-1">
                                            {attachment.name}
                                        </p>
                                        {deletingId === attachment.id && (
                                            <div className="absolute right-3 top-3">
                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                            </div>
                                        )}
                                        {deletingId !== attachment.id && (
                                            <button
                                                onClick={() => onDelete(attachment.id)}
                                                className="ml-auto hover:opacity-75 transition"
                                            >
                                                <X className="h-4 w-4"/>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {isEditing && (
                    <div>
                        <FileUpload
                            endpoint="mentorCV"
                            onChange={(url) => {
                                if(url) {
                                    onSubmit({ url: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Please upload a PDF of your CV.
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};