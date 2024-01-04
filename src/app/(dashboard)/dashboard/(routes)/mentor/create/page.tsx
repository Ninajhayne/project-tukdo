"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});


const CreatePage = () => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Check if the form is already submitted
            if (isSubmitted) {
                return;
            }

            // Set the form as submitted
            setIsSubmitted(true);

            const response = await axios.post("/api/courses", values);
            form.reset();
            router.push(`/dashboard/mentor/courses/${response.data.id}`);
            toast.success("Course created");
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h2 className="text-xl font-semibold sm:text-2xl">

                    Name your course
                </h2>
                <p className="text-sm text-muted-foreground">
                    What would you like to name your course? Don&apos;t worry, you can always change this later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                        autoComplete="off"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Academics'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/dashboard">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting || isSubmitted}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
 
export default CreatePage;