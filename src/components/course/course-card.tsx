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
                <div className="flex flex-col p-4 gap-2">
                    <div className="flex flex-col gap-x-2 justify-between">
                        <div className="flex items-center gap-x-2">
                            <p className="text-lg md:text-base font-medium line-clamp-2">
                                {title}
                            </p>
                            <p className="ml-auto flex-shrink-0">
                                {!rating ? "" : <span><span className="text-[#FFE600]">★</span> {rating.toFixed(1)}</span>}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-muted-foreground">
                            <p className="text-xs px-2 rounded-md  bg-transparent text-[#00528A] border border-[#00528A] hover:bg-accent">
                                {category}
                            </p>
                        </div>
                    </div>
{/*
                    <div className="text-lg md:text-base font-medium truncate">
                        {title}
                    </div>
                    <p className="text-xs px-2 rounded-md  bg-transparent text-[#00528A] border border-[#00528A] hover:bg-accent">
                        {category}
                    </p>

                    */}
                    <div className="flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-muted-foreground space-x-1">
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
                            {/*
                            <p className="font-medium">
                                {!rating ? "" : `★ ${rating.toFixed(1)}`}
                            </p>
                            */}
                            <p className="text-lg font-bold text-[#F2602D]"> 
                                {!price ? "Free" : `${formatPrice(price)}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

