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
        <div className="mb-2 flex flex-grow items-center space-x-4 rounded-md border border-gray-300 p-2 md:p-4 rounded-b-md">
            <div className="w-10 shrink-0 overflow-hidden rounded-md border border-neutral-200 text-center">
                <div className="bg-neutral-200 px-2 py-1 text-xs font-semibold uppercase text-neutral-600">
                    {nextAvailability ? nextAvailability.day : ""}
                </div>
                <div className="py-0.5 text-center text-sm font-semibold">
                    {nextAvailability ? nextAvailability.date : ""}
                </div>
            </div>
            <div className="flex-grow">
                <div className="text-sm font-semibold">
                    Next availability
                </div>
                <div className="text-xs text-neutral-600">
                    <div className="mt-1 leading-5">
                        <span className="mr-1 rounded-full bg-neutral-200 py-1 px-1.5">
                            {nextAvailability
                            ? nextAvailability.daysUntil === 1
                                ? 'Tomorrow'
                                : `in ${nextAvailability.daysUntil} days`
                            : ""}
                        </span>
                        <span className="dark:text-neutral-400">
                            {nextAvailability ? nextAvailability.fullDate : "No availability"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};