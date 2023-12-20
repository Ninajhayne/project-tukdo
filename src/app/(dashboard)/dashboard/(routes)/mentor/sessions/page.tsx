
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { SessionsCalendar } from "./_components/session-calendar";

const CalendarPage = async () => {
    const profile = await currentProfile();
    
    if (!profile) {
        return null;
    };

    const myListing = await db.listing.findUnique({
        where: {
            mentorId: profile.userId,
        },
        select: {
            id: true,
        }
    });

    if (!myListing) {
        return redirect("/dashboard/mentor/profile/new");
    }

    const reservations = await db.reservation.findMany({
        where: {
            listingId: myListing.id,
        },
        include: {
            user: true,
        }
    });

    return (
        <div>
            <SessionsCalendar
                reservations={reservations}
            />
        </div>  
    );    
};

export default CalendarPage;

/*



import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { ReservationDataTable } from "./_components/reservation-data-table";
import  { reservation_columns } from "./_components/reservation-columns";
import { db } from "@/lib/db";

const SessionsPage = async () => {
    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="p-6">
            <ReservationDataTable columns={reservation_columns} data={courses} />
        </div>
    );
}
 
export default SessionsPage;
*/

 /*
    const { userId } = auth();

    if(!userId) {
        return redirect("/sign-in");
    };

    const myListing = await db.listing.findUnique({
        where: {
            mentorId: userId,
        },
    });

    if(!myListing) {
        return redirect("/dashboard/mentor/profile/new");
    };

    const reservations = await db.reservation.findMany({
        where: {
            listingId: myListing.id,
        },
        include: {
            user: true,
        }
    });

    const myEventsList = reservations.map((reservation) => ({
        id: reservation.id,
        title: reservation.user.name, 
        start: new Date(reservation.startDate), 
        end: new Date(reservation.endDate), 
        // Other properties you want to include
    }));
    */
    //const [myEventsList, setMyEventsList] = useState([]);