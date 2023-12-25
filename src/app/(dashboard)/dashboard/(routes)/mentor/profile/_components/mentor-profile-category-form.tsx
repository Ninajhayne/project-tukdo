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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button";
//import { Combobox } from "@/components/ui/combo-box";

import { Pencil, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils";

interface MentorProfileCategoryFormProps {
    initialData: Listing;
    listingId: string;
    options: { label: string; value: string; }[];
};

const formSchema = z.object({
    listingCategoryId: z.string().min(1, {
        message: "Please select a category",
    })
});

export const MentorProfileCategoryForm = ({
    initialData,
    listingId,
    options,
}: MentorProfileCategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            listingCategoryId: initialData?.listingCategoryId || ""
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

    const selectedOption = options.find((option) => option.value === initialData.listingCategoryId);

    return (
        <Card
            //as="section"
            id="tutor-profile-category-form-container"
            aria-labelledby="tutor-profile-category-form-heading"
        >
            <CardContent>
                <div className="font-medium flex items-center justify-between mt-4">
                    Category
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
                        !initialData.listingCategoryId && "text-slate-500 italic"
                    )}>
                        {selectedOption?.label || "No Category"}
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
                                name="listingCategoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? options.find(
                                                                (option) => option.value === field.value
                                                            )?.label
                                                            : "Select a category"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search categories..." />
                                                    <CommandEmpty>No language found.</CommandEmpty>
                                                    <CommandGroup>
                                                    {options.map((option) => (
                                                        <CommandItem
                                                        value={option.label}
                                                        key={option.value}
                                                        onSelect={() => {
                                                            form.setValue("listingCategoryId", option.value)
                                                        }}
                                                        >
                                                        <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            option.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                            )}
                                                        />
                                                        {option.label}
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={isSubmitting}
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