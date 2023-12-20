import type { Metadata } from "next"
import Link from "next/link";

//import { getListings } from "@/app/_actions/listing/get-listings";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { getMentorLocations } from "@/app/_actions/listing/get-mentor-locations";
//import MentorLocations from "@/components/location/mentor-locations";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
const MentorLocations = dynamic(() => import("@/components/location/mentor-locations"), {
    ssr: false, // Set SSR to false
    loading: () => <Skeleton className="h-[75vh]"/>
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Tukdo Mentors",
    description: "Find mentors near you",
}

/*
interface ListingMapPageProps {
    searchParams: {
        title: string;
        listingCategoryId: string;
    }
};
*/
export default async function ListingsMapPage() {

    const mentorLocations = await getMentorLocations();
    //console.log("Mentor Locations:", mentorLocations);
    return (
        <div>
            <MentorLocations
                //@ts-ignore
                listings={mentorLocations}
            />
            <div className="fixed flex justify-center items-center bottom-16 left-0 right-0">
				<Link href={"/listings"} className="z-30">
					<Button className="px-4 py-4 rounded-full">
						<span
							className="flex items-center gap-2 text-sm"
						>
							<List size={18}/>
							Show list
						</span>
					</Button>
				</Link>
			</div>
        </div>
    );
};
