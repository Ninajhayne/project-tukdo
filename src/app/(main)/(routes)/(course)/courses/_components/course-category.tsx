"use client";

import { IconType } from "react-icons";
import { Category } from "@prisma/client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CoursesCategoryItem } from "./courses-category-item";

import { AiOutlineFormatPainter } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { GiFilmStrip } from "react-icons/gi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { PiBookOpenTextLight } from "react-icons/pi";
import { RxBarChart } from "react-icons/rx";
import { TfiCamera, TfiMusic } from "react-icons/tfi";

interface CoursesCategoriesProps {
    items: Category[];
	searchParams: {
        title?: string;
        categoryId?: string;
		price_range?: string;
    };
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": TfiMusic,
    "Photography": TfiCamera,
    "Academics": PiBookOpenTextLight,
    "Business": RxBarChart,
    "Computer Science": BsCodeSlash,
    "Filming": GiFilmStrip,
    "Design": AiOutlineFormatPainter,
    "Language": HiOutlineLanguage,
};

const CoursesCategories = ({
    items,
    searchParams,
}: CoursesCategoriesProps) => {
    return (
        <ScrollArea 
            //className="w-full rounded border bg-background text-muted-foreground shadow-2xl"
            className="w-full"
            //className="w-full rounded border bg-background text-muted-foreground"
        >
            <div className="flex items-center justify-center py-2">
                {items.map((item) => (
                    <CoursesCategoryItem
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
 
export default CoursesCategories;