"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { formatDate } from "@/lib/utils";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const formSchema = z.object({
    isApproved: z.boolean().default(false).optional(),
    userId: z.string().optional(),
    id: z.string().optional(),
});


export const EditSessionModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editSession";
    const { reservation }  = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isApproved: reservation?.approved,
            userId: reservation?.userId,
            id: reservation?.userProfileId,
        }
    }); 

    useEffect(() => {
        if(reservation) {
            form.setValue("isApproved", reservation.approved);
            form.setValue("userId", reservation.userId);
            form.setValue("id", reservation.userProfileId);
        };
    }, [reservation, form]);

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //console.log("values:", values);

        try {
            await axios.patch(`/api/reservation/${reservation?.id}`, values);

            form.reset();
            router.refresh();
            toast.success("Updated");
            onClose();
        } catch (error) {
            console.log(error);
        };
        
    };
    
    const handleClose = () => {
        form.reset();
        onClose();
    };

    //console.log("Reservation Data:", reservation);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Session Editor
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Use to view the running or completed sessions
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col justify-center items-center">
                    {reservation && reservation.imageUrl && (
                        <div className="flex flex-col items-center">
                            <Avatar>
                                <AvatarImage src={reservation.imageUrl} />
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                            <p>{reservation.name}</p>
                            <Separator className="my-2"/>
                            <div>
                                <p>Start Date: {formatDate(reservation.start)}</p>
                                <p>End Date: {formatDate(reservation.end)}</p>
                            </div>
                        </div>
                    )}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex items-center justify-center">
                            <FormField
                                control={form.control}
                                name="isApproved"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                className="mt-[2px]"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Session Status
                                            </FormLabel>
                                            <FormDescription>
                                                Check the box to approve this session
                                            </FormDescription>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 dark:bg-[#1E1F22] px-6 py-4"> 
                            <Button disabled={isLoading}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}