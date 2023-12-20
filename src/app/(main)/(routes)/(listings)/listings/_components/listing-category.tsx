"use client";

import { ListingCategory } from "@prisma/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { IconType } from "react-icons";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { GiFilmStrip } from "react-icons/gi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { PiBookOpenTextLight } from "react-icons/pi";
import { RxBarChart } from "react-icons/rx";
import { TfiCamera, TfiMusic } from "react-icons/tfi";

import { ListingCategoryItem } from "./listing-category-item";


interface ListingCategoriesProps {
    items: ListingCategory[];
    searchParams: {
        title?: string;
        listingCategoryId?: string;
		price_range?: string;
    };
}

const iconMap: Record<ListingCategory["name"], IconType> = {
    "Music": TfiMusic,
    "Photography": TfiCamera,
    "Academics": PiBookOpenTextLight,
    "Business": RxBarChart,
    "Computer Science": BsCodeSlash,
    "Filming": GiFilmStrip,
    "Design": AiOutlineFormatPainter,
    "Language": HiOutlineLanguage,
};

const ListingCategories = ({
    items,
    searchParams,
}: ListingCategoriesProps) => {

    return (
        <ScrollArea 
            //className="w-full rounded border bg-background text-muted-foreground shadow-2xl"
            className="w-full"
            //className="w-full rounded border bg-background text-muted-foreground"
        >
            <div className="flex items-center justify-center py-2">
                {items.map((item) => (
                    <ListingCategoryItem 
                        key={item.id}
                        label={item.name}
                        icon={iconMap[item.name]}
                        value={item.id}
                        searchParams={searchParams}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
 
export default ListingCategories;