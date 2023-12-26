import type { Metadata } from "next"

//import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { getListings } from "@/app/_actions/listing/get-listings";
import { Shell } from "@/components/shells/shell";
import { Listings } from "@/components/listing/listings";

import ListingCategories from "./_components/listing-category";
import ListingFilters from "./_components/listing-filters";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Find Tutors | TUKDO",
    description: "Find tutors",
}


interface ListingPageProps {
    searchParams: {
        title?: string;
        listingCategoryId?: string;
		price_range?: string;
        mode?: string;
    }
};

export default async function ListingsPage({
    searchParams,
}: ListingPageProps) {
    //const { userId } = auth();

    const listingCategories = await db.listingCategory.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const listings = await getListings({
        //userId: userId || "",
        ...searchParams,
    });

    //console.log("Listings:", listings);

    return (
        <>
            <section
                id="build-a-board-categories"
                aria-labelledby="build-a-board-categories-heading"
                className="sticky top-16 z-30 w-full shrink-0 overflow-hidden bg-background/50 pb-4 shadow-md sm:backdrop-blur"
            >
                {/*<div className="flex flex-row items-center justify-center space-x-2 bg-background px-8">*/}
                <div className="flex flex-row items-center justify-between bg-background px-6 xs:px-6 lg:px-9 xl:px-9 space-x-9">

                    <div className="flex-grow">
                        <div className="grid place-items-center">
                            <ListingCategories 
                                items={listingCategories}
                                searchParams={searchParams}
                            />
                        </div>
                    </div>
                    <div className="ml-6 xs:ml-6 lg:ml-9 xl:ml-12">
                        <ListingFilters
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            </section>
            
            <Shell>
                <Listings
                    items={listings}
                />
            </Shell>
        </>
    );
};
