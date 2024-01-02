"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";

//import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";

import { Plus } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type,
}: ChatInputProps) => {
    const { onOpen } = useModal();

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            content: "",
        }
    });
    

    const isLoading = form.formState.isSubmitting;
    //console.log("Is Loading?", isLoading);
    
    //Temporary Solution
    //For Button
    //const [disabled, setIsDisabled] = useState(false);
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, values);
            
            form.reset();
            router.refresh();
            
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-4">
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-[#F2602D] dark:bg-[#F2602D] hover:bg-[#C44D24] dark:hover:bg-[#C44D24]transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-[#00538a12] dark:bg-[#00538a36] border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder={`Write a message..`}
                                        {...(isLoading ? {} : field)}
                                        //{...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
        
    )
};

/*
<Input
    disabled={isLoading}
    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
    {...(isLoading ? {} : field)}
    //{...field}
/>
*/