import Image from "next/image";
import Link from "next/link";

//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";

import { CourseProgress } from "./course-progress";

import { BookOpen } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
    rating: number;
    numOfRatings: number;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
    rating,
    numOfRatings,
}:CourseCardProps) => {
    return (
        <Link href={`/course/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                    />
                    {/*
                        <div
                            className="absolute bottom-0 left-0 ml-2 mb-1"
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    */}
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium truncate">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500 space-x-1">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                        <div>
                            <p className="font-medium">
                                {!rating ? "" : `★ ${rating.toFixed(2)}`}
                            </p>
                            <p className="text-md md:text-sm font-meduim text-slate-400"> 
                                {!price ? "Free" : `${formatPrice(price)}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

