"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

import { Listing } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

//import { Label } from "@/components/ui/label"
//import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";

interface MentorFeeFormProps {
    initialData: Listing;
    listingId: string;
};

const formSchema = z.object({
    fee: z.coerce
        .number()
        .min(0, {
            message: "Enter a valid fee",
        })
        .max(10000, {
            message: "Fee must be at most 10000",
        }),
});

export const MentorFeeForm = ({
    initialData,
    listingId,
}: MentorFeeFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    //const [selectedValue, setSelectedValue] = useState("free");

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fee: initialData?.fee || undefined,
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
    /*
    const handleRadioChange = (value: number) => {
        //setSelectedValue(value);
    };

    const handleInputChange = (e: any) => {
        const newValue = parseFloat(e.target.value);
        // Check if newValue is a valid number and greater than or equal to 100
        if (!isNaN(newValue) && newValue >= 100) {
          // Set the input value
          // Note: You should use state management to update the input value
        }
    };
    */
    return (
        <Card
            //as="section"
            id="mentor-fee-form-container"
            aria-labelledby="mentor-fee-form-heading"
        >
            <CardContent>
                <div className="font-medium flex items-center justify-between mt-4">
                    Fee
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
                        !initialData.fee && "text-slate-500 italic"
                    )}>
                        {initialData.fee
                            ? formatPrice(initialData.fee)
                            : "Free"
                        }
                    </p>
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
                                name="fee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex space-x-2 flex-col sm:flex-row sm:items-center">
                                                <Input
                                                    disabled={isSubmitting}
                                                    step="0.01"
                                                    className="mt-2 sm:mt-0" 
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>Type 0 to mark it free</FormDescription>
                                        <FormMessage />
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

/*
<Form {...form}>
    <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4"
        autoComplete="off"
    >
        <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            disabled={isSubmitting}
                            step="0.01"
                            className="mt-2 sm:mt-0" 
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
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

<div className="flex space-x-2 flex-col sm:flex-row sm:items-center">
                                                
                                                
</div>
<RadioGroup 
    defaultValue="paid" 
    className="flex"
    //onValueChange={handleRadioChange}
    //defaultValue={field.value}
>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="free" id="r1" />
        <Label htmlFor="r1">Free</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="paid" id="r2" />
        <Label htmlFor="r2">Paid</Label>
    </div>
</RadioGroup>
*/