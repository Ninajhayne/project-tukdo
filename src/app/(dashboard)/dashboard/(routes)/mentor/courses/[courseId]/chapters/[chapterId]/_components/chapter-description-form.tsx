"use client";



import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Editor } from "@/components/text-editor/editor";
import { Preview } from "@/components/text-editor/preview";
import { Card, CardContent } from "@/components/ui/card";


interface ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    description: z.string().min(1),
});

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterDescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

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
            id="tutor-bio-form-container"
            aria-labelledby="tutor-bio-form-heading"
            className="mt-2"
        >
            <CardContent className="mt-2">
                <div className="font-medium flex items-center justify-between">
                    Chapter description
                    <Button onClick={toggleEdit} variant="ghost">
                        {isEditing ? (
                            <>Cancel</>
                        ): (
                            <>
                                <Pencil className="h-4 w-4 mr-2"/>
                                Edit
                            </>
                        )}
                    </Button>
                </div>
                {!isEditing && (
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}>
                        {!initialData.description && "No Description"}
                        {initialData.description && (
                            <Preview
                                value={initialData.description}
                                className="text-gray-800 dark:text-white"
                            />
                        )}
                    </div>
                )}
                {isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Editor
                                                className="text-gray-800 dark:text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
};