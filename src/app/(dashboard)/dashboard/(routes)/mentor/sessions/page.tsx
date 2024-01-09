
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { SessionsCalendar } from "./_components/session-calendar";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Shell } from "@/components/shells/shell"
import { DownloadPdfButton } from "./_components/download-pdf-button";

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
        <Shell variant="sidebar" as="div">
            <div>
                <SessionsCalendar
                    reservations={reservations}
                />
            </div>
            <div className="flex items-center">
                <div className="flex items-center space-x-2">
                    
                    <DownloadPdfButton
                        reserve={reservations}
                        tutor={profile}
                    />				
                </div>
            </div>

            {reservations !== null ? (
                    <DataTable columns={columns} data={reservations} />
                ) : (
                    <p>No data available</p>
                )}

        </Shell>  
    );    
};

export default CalendarPage;
