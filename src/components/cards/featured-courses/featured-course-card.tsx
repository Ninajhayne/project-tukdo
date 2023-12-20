import Image from "next/image";
import Link from "next/link";

import { Course } from "@prisma/client";

import { formatPrice } from "@/lib/format";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Icons } from "@/components/icons"

interface  FeaturedCourseCardProps {
    course: Course
}

export const FeaturedCourseCard = ({
    course,
}: FeaturedCourseCardProps) => {
    return (
        <Card
            className="h-full overflow-hidden rounded-sm transition-colors hover:bg-muted/50"
        >
            <Link aria-label={course.title} href={`/course/${course.id}`}>
                <CardHeader className="border-b p-0">
                    <AspectRatio ratio={16 / 9}>
                        {course.imageUrl ? (
                            <Image
                                src={
                                    course.imageUrl
                                }
                                alt={course.title}
                                className="object-cover"
                                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                fill
                                loading="lazy"
                            />
                        ) : (
                            <div
                                aria-label="Placeholder"
                                role="img"
                                aria-roledescription="placeholder"
                                className="flex h-full w-full items-center justify-center bg-secondary"
                            >
                                <Icons.placeholder
                                    className="h-9 w-9 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                    </AspectRatio>
                </CardHeader>
                <span className="sr-only">{course.title}</span>
                <CardContent className="grid gap-2.5 p-4">
                    <CardTitle className="line-clamp-1 text-base">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 flex flex-col">
                        <span className="font-medium">
                            {!course.rating ? "" : `★ ${course.rating.toFixed(2)}`}
                        </span>
                        <span className="text-md md:text-sm font-meduim text-slate-400"> 
                            {!course.price ? "Free" : `${formatPrice(course.price)}`}
                        </span>
                    </CardDescription>
                </CardContent>
            </Link>
        </Card>
        
    );
};

/*
<Link href={`/course/${course.id}`}>
    <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
                fill
                className="object-cover"
                alt={course.title}
                src={course.imageUrl!}
            />
        </div>
        <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium truncate">
                {course.title}
            </div>
            <div>
                <p className="font-medium">
                    {!course.averageRating ? "" : `★ ${course.averageRating / course.numOfRatings}`}
                </p>
                <p className="text-md md:text-sm font-meduim text-slate-400"> 
                    {!course.price ? "Free" : `${formatPrice(course.price)}`}
                </p>
            </div>
        </div>
    </div>
</Link>
*/

