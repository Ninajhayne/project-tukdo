import Link from "next/link";
import { ListingCategory, Listing } from "@prisma/client";
import { ListingCard } from "./listing-card";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";


type ListingWithCategoryWithProfile = Listing & {
    listingCategory: ListingCategory | null;
    mentor: {
        imageUrl: string;
        name: string;
        email: string;
    };
};

interface ListingsProps {
    items: ListingWithCategoryWithProfile[];
}

export const Listings = ({
    items,
}: ListingsProps) => {
    //console.log("Items:", items);

    return (
        <div className="flex flex-col space-y-6 min-h-screen">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                    <ListingCard
                        key={item.id}
                        id={item.id}
                        name={item?.mentor?.name}
                        imageUrl={item?.mentor?.imageUrl}
                        email={item?.mentor?.email}
                        description={item.description}
                        location={item.location}
                        videoUrl={item.videoUrl}
                        mode={item.mode}
                        fee={item.fee ?? 0}

                        //location={item.location}
                        category={item.listingCategory?.name}

                        rating={item.rating}
                        numOfRatings={item.numOfRatings}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No mentors found
                </div>
            )}
            <div className="fixed flex justify-center items-center bottom-16 left-0 right-0">
                <Link href={"/listings/map"}>
                    <Button className="px-4 py-4 rounded-full ">
                        <span
                            className="flex items-center gap-2 text-sm"
                        >
                            <Map/>
                            Show Map
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
        
    );
};

/*
{!isMapView ? (
    <>
        Show Map <BsFillMapFill />
    </>
) : (
    <>
        Show List <AiOutlineUnorderedList />
    </>
)}
*/