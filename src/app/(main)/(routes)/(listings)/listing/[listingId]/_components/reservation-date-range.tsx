"use client"

import * as z from "zod"
import * as React from "react"
import axios from "axios";

import { toast } from "sonner"
import { useRouter, redirect } from "next/navigation";
import { useForm } from "react-hook-form"

import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Listing, Reservation } from "@prisma/client"
import { cn, currencyFormater } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"  
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    //CardDescription,
    //CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

import { ChevronDown, Dot, Loader2 } from "lucide-react"

interface MentorListing {
    listing: Listing;
    reservations: Reservation[];
    myReservation: Reservation | null;
    disableButton: boolean;
    userId: string | null; 
}

const FormSchema = z.object({
    reservationDate: z.object({
        from: z.date({
            required_error: "A start date is required",
        }),
        to: z.date({
            required_error: "An end date is required",
        }),
    }),
});


export function ReservationDateRange({
    listing,
    reservations,
    myReservation,
    disableButton,
    userId,
}: MentorListing) {
    const router = useRouter();

    const latestDate = new Date();
    latestDate.setDate(latestDate.getDate() + 1);
    const latestDatePlus4 = new Date();
    latestDatePlus4.setDate(latestDate.getDate() + 4);

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: myReservation?.startDate || undefined,
        to: myReservation?.endDate || undefined,
    });
    
    //const tukdoServiceFee = listing.fee === 0 || date === undefined ? 0 : 100;
    const tukdoServiceFee = (listing.fee === 0 || (date?.from === undefined && date?.to === undefined)) ? 0 : 100;
    const [ totalPrice, setTotalPrice ] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    /*
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: myReservation?.startDate || latestDate,
        to: myReservation?.endDate || latestDate,
    });
    */
    // Create default values that match the structure
    const defaultValues = {
        reservationDate: {
            from: myReservation?.startDate || latestDate,
            to: myReservation?.endDate || latestDate,
        },
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    /*
    const handleDateSelect = (value: DateRange) => {
        if (value) {
            setDate(value);
        };
    };
    */
    
    const calculateNumberOfDays = () => {
        if (date && date.from && date.to) {
            const start = new Date(date.from);
            const end = new Date(date.to);
            const timeDifference = end.getTime() - start.getTime();
            const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

            return numberOfDays + 1;
        } else {
            return 0;
        }
    };
    
    /*
    const calculateNumberOfDays = () => {
        if ( && date.from && date.to) {
            const start = new Date(date.from);
            const end = new Date(date.to);
            const timeDifference = end.getTime() - start.getTime();
            const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            return numberOfDays;
        }
        return 0;
    };    
    */
    // Calculate the total price based on the number of days
    /*
    const calculateTotalPrice = () => {
        const numberOfDays = calculateNumberOfDays() + 1;
        const fee = listing.fee || 0;
        const totalPrice = (fee * numberOfDays + tukdoServiceFee);
        setTotalPrice(totalPrice);
    };
    */
    const calculateTotalPrice = () => {
        const numberOfDays = calculateNumberOfDays();
        const fee = listing.fee || 0;
      
        if (fee === 0) {
            setTotalPrice(0);
        } else {
            const totalPrice = fee * numberOfDays + tukdoServiceFee;
            setTotalPrice(totalPrice);
        };
    };

    React.useEffect(() => {
        calculateTotalPrice();
    }, [date]);

    const onSubmit = async(data: z.infer<typeof FormSchema>) => {
        setLoading(true);

        //console.log("Data:", data);
        if(!userId) {
            //toast.error("You must be signed in");
            toast.error("You must be signed in", {
                action: {
                    label: 'Sign-in',
                    onClick: () => {
                        router.push('/sign-in');
                    },
                },
            });
            setLoading(false);
            return;
        };

        if (!date || !date.from || !date.to) {
            toast.error("A date is required");
            setLoading(false);
            return;
        };

        const payload = {
            reservationDate: date,
            totalPrice,
        };
        
        try {
            /*
            await axios.post(`/api/listing/${listing.id}`, payload);
            toast.success("Reserved");
            */
            
            if (myReservation) {
                // User has an existing reservation, so update it
                await axios.patch(`/api/listing/${listing.id}`, payload);
                toast.success("Reservation updated");
            } else {
                // User doesn't have an existing reservation, create a new one
                await axios.post(`/api/listing/${listing.id}`, payload);
                toast.success("Reserved");
            }
            
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false); // Enable the button after submission
        };
    };

    /*
    const isDateDisabled = (date: Date) => {
        // Check if date is earlier than the current date
        if (date < latestDate) {
          return true; // Disable dates in the past
        }
    
        // Check if date falls within any of the reservation date ranges
        return reservations.some((reservation) => {
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);
          return date >= startDate && date <= endDate;
        });
    };
    */
    /*
    const handleDayClick = (day: Date) => {
        if (isDateDisabled(day)) {
            return; // Do nothing if the clicked date is disabled
        }
    
        // Check for a disabled date before the selected date
        
        if (selectedDate) {
            if (selectedDate > day) {
                setSelectedDate(day);
            } else {
                // Check for a disabled date after the selected date
                let isInRange = false;
                reservations.forEach((reservation) => {
                const startDate = new Date(reservation.startDate);
                const endDate = new Date(reservation.endDate);
                if (day >= startDate && day <= endDate) {
                    isInRange = true;
                }
                });
                if (!isInRange) {
                setSelectedDate(day);
                }
            }
        } else {
            setSelectedDate(day);
        }
    };
    */
    //console.log("Disabled Dates:", disabledDates);

    return (
        <Card className="p-4 dark:bg-[#00538a36] bg-[#00538a12]">
            <CardHeader className="px-0 md:px-2 py-2">
                <CardTitle className="flex flex-row justify-between items-center lg:text-base text-xs">
                    <div className="text-left flex flex-row items-center">
                        {listing.fee === 0 || !listing.fee ? (
                            <p className="text-green-500">
                                Free
                            </p>
                        ): (
                            <>
                                <p className="font-bold text-lg mr-1">
                                    {currencyFormater({
                                        amount: listing.fee!,
                                        currency: "usd"
                                    })}
                                </p>
                                <p>/ day</p>
                            </>
                        )} 
                        
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="font-semibold">
                            <span className="text-[#FFE600]">★</span> {listing.rating.toFixed(1)}
                        </p>
                        <Dot className="w-4 h-4 mt-1"/>
                        {/*
                            <Button variant="link" size="sm" className="underline p-0 text-xs text-slate-500">
                                {listing.numOfRatings} reviews
                            </Button>
                        */}
                        
                        <p className="text-slate-500 text-sm">
                            {!listing.numOfRatings ? 'No reviews' :
                            listing.numOfRatings === 1 ? `${listing.numOfRatings} review` :
                            `${listing.numOfRatings} reviews`}
                        </p>
                    </div>
                </CardTitle>
                {/*
                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-2 w-full">
                            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md">
                            <label className="font-semibold text-xs">CHECK-IN</label>
                                {format(date.from!, "MM/dd/yyyy")}
                            </div>
                            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tr-md">
                            <label className="font-semibold text-xs">CHECK-OUT</label>
                                {format(date.to!, "MM/dd/yyyy")}
                            </div>
                        </div>
                    </div>
                */}
            </CardHeader>
            <Separator/>
            <CardContent className="grid gap-2 px-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="reservationDate"
                            render={({ field }) => (
                                <FormItem>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <div className="flex flex-col w-full cursor-pointer pt-2">
                                                    <div className="grid grid-cols-2 w-full">
                                                        
                                                        <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md">
                                                            <label className="font-semibold text-xs cursor-pointer">
                                                                START
                                                            </label>
                                                            {date?.from && (
                                                                <span>
                                                                    {format(date.from, "MM/dd/yyyy")}
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tr-md">
                                                            <label className="font-semibold text-xs cursor-pointer">
                                                                END
                                                            </label>
                                                            {date?.to && (
                                                                <span>
                                                                    {format(date.to, "MM/dd/yyyy")}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-row gap-2 border border-gray-300 p-2 rounded-b-md cursor-pointer items-center">
                                                        <span
                                                            className={cn(
                                                                "rounded-full h-4 w-4 mt-[2px]",
                                                                myReservation === null && "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
                                                                myReservation?.approved && "bg-gradient-to-tr from-lime-400 via-emerald-500 to-teal-700",
                                                                !myReservation?.approved &&  myReservation !== null && "bg-gradient-to-r from-yellow-600 to-red-600",
                                                            )}
                                                        >
                                                            
                                                        </span>
                                                        <label className="font-medium text-sm cursor-pointer">Your Reservation:</label>
                                                        {myReservation && (
                                                            <div className="flex gap-x-2">
                                                                <p>{format(myReservation.startDate, "MMM dd")}</p>
                                                                <p>-</p>
                                                                <p>{format(myReservation.endDate, "MMM dd")}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 shadow-lg" align="end">
                                            <Calendar
                                                showOutsideDays={false}
                                                initialFocus
                                                mode="range"
                                                defaultMonth={latestDate}
                                                selected={date}
                                                //selected={field.value}
                                                onSelect={setDate}
                                                //onSelect={field.onChange}
                                                numberOfMonths={2}
                                                //disabled={(date) => date < new Date()}
                                                fixedWeeks
                                                
                                                disabled={(date) => {
                                                    // Check if date is earlier than the current date
                                                    if (date < new Date()) {
                                                        return true; // Disable dates in the past
                                                    }
                                            
                                                    // Check if date falls within any of the reservation date ranges
                                                    return reservations.some((reservation) => {
                                                        const startDate = new Date(reservation.startDate);
                                                        const endDate = new Date(reservation.endDate);
                                                        return date >= startDate && date <= endDate;
                                                    });
                                                }}
                                                
                                               //disabled={isDateDisabled}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    <Button 
                                        type="submit" 
                                        className="w-full"
                                        //@ts-ignore
                                        disabled={disableButton || loading}
                                    >
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        {myReservation ? "Update" : "Reserve"}
                                    </Button>
                                </FormItem>
                            )}
                        />
                        
                    </form>
                </Form>
                <Separator className="my-1"/>
                <div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-sm">
                                {currencyFormater({
                                    amount: listing.fee!,
                                    currency: "usd"
                                })} x {calculateNumberOfDays()} days
                            </p>
                            <p>
                                    {currencyFormater({
                                        amount: totalPrice - tukdoServiceFee,
                                        currency: "usd"
                                    })}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-sm">
                                Tukdo service fee
                            </p>
                            <p>
                                {currencyFormater({
                                    amount: tukdoServiceFee,
                                    currency: "usd"
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator/>
                {listing.fee === 0 || !listing.fee ? (
                    <h2 className="items-center">
                        Free
                    </h2>
                ) : (
                    <div className="flex flex-row justify-between w-full">
                        <p className="text-lg font-bold">
                            Total Price
                        </p>
                        {totalPrice !== 0 && (
                            <p className="text-lg font-bold">
                                {currencyFormater({
                                    amount: totalPrice,
                                    currency: "usd"
                                })}
                            </p>
                        )}
                    </div>
                )}
                
            </CardContent>
        </Card>
    );
};
