import { Reservation } from "@prisma/client";

export function findNextAvailability(reservations: Reservation[]) {
    const currentDate = new Date();

    // Extract all reserved dates
    const reservedDates = reservations
        .flatMap(reservation => {
            const startDate = new Date(reservation.startDate);
            const endDate = new Date(reservation.endDate);
            const dates = [];

            // Loop through the reservation dates and add them to the array
            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                dates.push(date.toISOString().split('T')[0]);
            }

            return dates;
        });

    // Find the minimum available date after today
    let nextAvailableDate = new Date(currentDate);
    nextAvailableDate.setDate(currentDate.getDate() + 1);

    // Skip the current day if it's reserved
    if (reservedDates.includes(nextAvailableDate.toISOString().split('T')[0])) {
        nextAvailableDate.setDate(currentDate.getDate() + 2);
    }

    // Find the next available date after today
    while (reservedDates.includes(nextAvailableDate.toISOString().split('T')[0])) {
        nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
    }

    const daysUntil = Math.ceil((nextAvailableDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
        day: nextAvailableDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: nextAvailableDate.toLocaleDateString('en-US', { day: 'numeric' }),
        daysUntil: daysUntil,
        fullDate: nextAvailableDate.toLocaleString("en-US", {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            timeZoneName: 'short',
        }),
    };
}
