"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";

import { Listing } from "@prisma/client";
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

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface MentorBioFormProps {
    initialData: Listing;
    listingId: string;
};

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const MentorBioForm = ({
    initialData,
    listingId,
}: MentorBioFormProps) => {
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
            await axios.patch(`/api/mentor/listings/${listingId}`, values);
            toast.success("Profile Updated");
            
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
            >
                <CardContent>
                    <div className="font-medium flex items-center justify-between mt-4">
                        About Me
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
                        <p className={cn(
                            "text-sm mt-2",
                            !initialData.description && "text-slate-500 italic"
                        )}>
                            {initialData.description || "No Description"}
                        </p>
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
                                                <Textarea
                                                    disabled={isSubmitting}
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