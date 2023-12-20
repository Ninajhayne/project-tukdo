"use client";

import * as z from "zod";
import axios from "axios";
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

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Title is required",
    }),
});

const MentorOnboardingForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/mentor/listings", values);
            router.push("/dashboard/mentor/profile");
            toast.success("Success");
        } catch {
            toast.error("Something went wrong");
        };
    };

    return (
            <div>
                <h1 className="text-2xl">
                    Tell us about yourself
                </h1>
                <p className="text-sm text-slate-600">
                    Share your expertise, grow, make a difference
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                        autoComplete="off"
                    >
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        About me
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
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
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
    );
}
 
export default MentorOnboardingForm;