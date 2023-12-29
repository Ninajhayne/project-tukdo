"use client";

import { findNextAvailability } from "@/lib/reservation/find-next-availability";
import { Listing, Reservation } from "@prisma/client";

interface MentorAvailabilityProps {
    mentorListing: Listing;
    reservations: Reservation[];
};

export const MentorAvailability = ({
    mentorListing,
    reservations,
} : MentorAvailabilityProps) => {
    const nextAvailability = findNextAvailability(reservations);

    return (
        <div className="mb-2 flex flex-grow items-center space-x-4 rounded-md border border-gray-300 p-2 md:p-4 rounded-b-md dark:bg-[#00538a36] dark:border-[#00538a36]">
            <div className="w-15 shrink-0 overflow-hidden rounded-md border border-neutral-200 text-center">
                <div className="bg-[#F2602D] px-3 py-1 text-xs font-semibold uppercase text-[#ffffff]">
                    {nextAvailability ? nextAvailability.day : ""}
                </div>
                <div className="py-0.5 text-center text-sm font-semibold dark:text-foreground">
                    {nextAvailability ? nextAvailability.date : ""}
                </div>
            </div>
            <div className="flex-grow">
                <div className="text-sm font-semibold">
                    Next availability
                </div>
                <div className="text-xs text-neutral-600">
                    <div className="mt-1 leading-5">
                        <span className="mr-2 rounded-full bg-[#00528A] py-1 px-2 text-[#ffffff]">
                            {nextAvailability
                            ? nextAvailability.daysUntil === 1
                                ? 'Tomorrow'
                                : `in ${nextAvailability.daysUntil} days`
                            : ""}
                        </span>
                        <span className="dark:text-[#FFFFFF]">
                            {nextAvailability ? nextAvailability.fullDate : "No availability"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};