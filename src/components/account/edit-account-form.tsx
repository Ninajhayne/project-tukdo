"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Profile } from "@prisma/client";


interface EditAccountFormProps {
    userName: string;
    user: Profile;
};

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required",
    }),
});

export const EditAccountForm = ({
    userName,
    user,
}: EditAccountFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: ""
        },
    });

    const initials = `${user?.name?.charAt(0) ?? ""}`;

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch("/api/clerkUser", values);
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
            id="edit-account-form-container"
            aria-labelledby="edit-account-form-heading"
        >
            <CardContent className="mt-2">
                <div className="font-medium flex items-center justify-end">
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
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="text-sm font-medium leading-none">
                                {user.name}
                            </h3>
                        </div>
                    </div>
                )}
                {isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                            autoComplete="off"
                        >
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
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