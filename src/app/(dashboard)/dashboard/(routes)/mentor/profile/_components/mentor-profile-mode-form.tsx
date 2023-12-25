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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface MentorProfileModeFormProps {
    initialData: Listing;
    listingId: string;
};

const formSchema = z.object({
    mode: z.string().min(1)
});

export const MentorProfileModeForm = ({
    initialData,
    listingId,
}: MentorProfileModeFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mode: initialData?.mode || ""
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

    //const selectedOption = options.find((option) => option.value === initialData.listingCategoryId);

    return (
        <Card
            //as="section"
            id="tutor-profile-mode-form-container"
            aria-labelledby="tutor-profile-mode-form-heading"
        >
            <CardContent>
                <div className="font-medium flex items-center justify-between mt-4">
                    Mode
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
                        !initialData.mode && "text-slate-500 italic"
                    )}>
                        {initialData.mode || "Select a mode"}
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
                                name="mode"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="- Select a mode -" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Virtual/In-Person">Virtual/In-Person</SelectItem>
                                                <SelectItem value="Virtual">Virtual</SelectItem>
                                                <SelectItem value="In-person">In-person</SelectItem>
                                            </SelectContent>
                                        </Select>
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