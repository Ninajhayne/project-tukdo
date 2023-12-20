"use client";

import * as z from "zod";
import axios from "axios";

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ListingRating } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner"
import { Rating } from 'react-simple-star-rating'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ListingRatingModalProps {
    initialData: ListingRating | null;
    listingId: string;
    userId: string | null;
};

const formSchema = z.object({
    rating: z.number().min(1, {
        message: "Rating is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const ListingRatingModal = ({
    initialData,
    listingId,
    userId,
}: ListingRatingModalProps) => {

    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    

    //const onPointerEnter = () => toast('Enter');
    //const onPointerLeave = () => toast('Leave');
    //const onPointerMove = (value: number, index: number) => console.log(value, index);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        /*
        defaultValues: {
            rating: initialData?.rating || 0,
            description: initialData?.description || "",
            //rating: 0,
            //description: "",
        },
        */
        values: {
            rating: initialData?.rating || 0,
            description: initialData?.description || "",
        }
    });

    //console.log("My Rating in Modal", myRating);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //console.log("Values:", values);

            //await axios.patch(`/api/ratings/course-ratings/${courseId}`, values);
            //toast.success("Rated");

            
            if (initialData) {
                // User has an existing reservation, so update it
                await axios.patch(`/api/ratings/listing-ratings/${listingId}`, values);
            } else {
                // User doesn't have an existing reservation, create a new one
                await axios.post(`/api/ratings/listing-ratings/${listingId}`, values);
            }
            
            toast.success("Rated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleClose = () => {
        form.reset();
    };

    useEffect(() => {
        setIsMounted(true);
    }, [listingId]);

    if(!isMounted) {
        return (
            <Button 
                variant="outline"
                size="sm"
                disabled
            >
                Rate
            </Button>
        );
    };

    return (
        <Dialog /*open={isModalOpen}*/ onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline"
                    size="sm"
                    disabled={!userId}
                    //onClick={() => onOpen("courseRating")}
                >
                    Rate
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Mentor rating</DialogTitle>
                    <DialogDescription>
                        Share your thoughts
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        //className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center pb-4">
                                            <Rating
                                                onClick={(value: number) => field.onChange(value)}
                                                initialValue={field.value}
                                                //onPointerEnter={onPointerEnter}
                                                //onPointerLeave={onPointerLeave}
                                                //onPointerMove={onPointerMove}
                                                emptyStyle={{ display: "flex" }} 
                                                fillStyle={{ display: "-webkit-inline-box" }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="grid w-full gap-1.5">
                                            <Label htmlFor="message">Description</Label>
                                            <Textarea
                                                id="message"
                                                disabled={isSubmitting}
                                                placeholder="Type your message here."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        <DialogFooter className="py-2">
                            <Button 
                                type="submit"
                                disabled={!isValid || isSubmitting || !form.formState.isDirty}
                            >
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
};