"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Listing } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/file-upload";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import Link from "next/link";

interface MentorServerFormProps {
    initialData: Listing;
    listingId: string;
};

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    }),
    //serverId: z.string(),
});

export const MentorServerForm = ({
    initialData,
    listingId,
}: MentorServerFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            //serverId: initialData?.serverId || undefined
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //console.log("Form submitted with values:", values);
            // Perform the POST request and capture the response
            const response = await axios.post("/api/plaza/servers", { ...values, listingId});

            // Extract the ID from the response
            const { id } = response.data;

            // Update the form values with the captured ID
            const updatedValues = { serverId: id };

            // Perform the PATCH request with the updated values
            await axios.patch(`/api/mentor/listings/${listingId}`, updatedValues);

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
                id="mentor-server-form-container"
                aria-labelledby="mentor-server-form-heading"
            >
                <CardHeader>
                    <CardTitle>Customize your server</CardTitle>
                    <CardDescription>
                        Give your server a personality with a name and an image. You can always change it later.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {initialData.serverId ? (
                        <Link href={`/plaza/servers/${initialData.serverId}`}>
                            <Button>
                                Visit
                            </Button>
                        </Link>
                        
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                                <div className="space-y-2 px-6">
                                    <div className="flex items-center justify-center text-center">
                                        <FormField
                                            control={form.control}
                                            name="imageUrl"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <FileUpload
                                                            endpoint="serverImage"
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage
                                                        className="text-xs text-red-400"
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold"
                                                >
                                                    Server Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        placeholder="Enter Server Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage
                                                    className="text-xs text-red-400"
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <Button disabled={isLoading}>
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                    
                </CardContent>
            </Card>
    );
};