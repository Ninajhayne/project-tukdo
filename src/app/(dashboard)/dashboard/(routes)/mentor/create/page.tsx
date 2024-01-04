"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

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

import {
    Card,
    CardContent,
} from "@/components/ui/card"
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
        <Shell variant="sidebar">
                <PageHeader id="billing-header" aria-labelledby="billing-header-heading" className="rounded-lg shadow-sm bg-[#F2602D] flex items-center gap-x-2">
                    <div className="p-6">
                        <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Course Creation</PageHeaderHeading>
                        <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                            What would you like to name your course? Don&apos;t worry, you can always change this later.
                        </PageHeaderDescription>
                    </div>
                    <div className="ml-auto flex-shrink- mr-6">
                        <Image
                            src="/images/header/owl.png"
                            alt=""
                            width={100}
                            height={100}
                            className="w-32 h-28 object-cover"
                            loading="lazy"
                        />
                    </div>
                </PageHeader>     
                <Card
                    //as="section"
                    id="new-course-page-form-container"
                    aria-labelledby="new-course-page-form-heading"
                >
                    <CardContent>
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
                                        <FormLabel className="font-medium text-base">
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
                    </CardContent>
                </Card>
                
        </Shell>
    )
}
 
export default CreatePage;