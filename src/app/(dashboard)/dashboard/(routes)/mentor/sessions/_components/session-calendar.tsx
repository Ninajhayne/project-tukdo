"use client"

import { useEffect, useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useModal } from "@/hooks/use-modal-store";

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import { Profile, Reservation } from "@prisma/client";
import "react-big-calendar/lib/css/react-big-calendar.css"
/*
let formats = {
    dateFormat: 'dd',
    dayFormat: (date: Date, culture: string, localizer: any) =>
      localizer.format(date, 'EEE', culture),
};
*/
const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
    dayFormat: (date: Date, culture: string) => {
        return format(date, 'EEE');
    },
})

interface SessionsCalendarProps {
    reservations: Reservation[];
};

interface ReservationProps {
    id: string;
    userId: string; 
    title: string; 
    start: Date; 
    end: Date; 
    approved: boolean;
    user?: Profile;
}

export const SessionsCalendar = ({
    reservations,
}: SessionsCalendarProps) => {
    const { onOpen } = useModal();
    const [myEventsList, setMyEventsList] = useState<ReservationProps[]>([]);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const events = reservations.map((reservation: any) => ({
            id: reservation.id,
            userId: reservation.userId,
            userProfileId: reservation.user.id,
            title: reservation.user.name,
            start: new Date(reservation.startDate),
            // Ensure the end date includes the full day
            end: new Date(new Date(reservation.endDate).setHours(23, 59, 59, 999)),
            // Other properties you want to include
            approved: reservation.approved,
            imageUrl: reservation.user.imageUrl,
            name: reservation.user.name,
        }));
    
        setMyEventsList(events);
    }, [reservations]);
    

    return (
        <div className="pt-4 container">
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"

                views={['month']}
                style={{ height: 450 }}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                //onSelectEvent={handleEventClick}
                //@ts-ignore
                onSelectEvent={(event) => onOpen("editSession", { reservation: event })}
                
                eventPropGetter={(event) => {
                    //const backgroundColor = event.approved ? 'green' : 'orange';
                    const backgroundColor = event.approved ? '#009e60' : '#ffe5b4';
                    const textColor = event.approved ? 'white' : 'black';
                    //const backgroundColor = event.approved ? 'orange' : 'green';
                
                    return {
                        style: {
                            backgroundColor,
                            color: textColor,
                        },
                    };
                }}
            />
        </div>  
    );    
};