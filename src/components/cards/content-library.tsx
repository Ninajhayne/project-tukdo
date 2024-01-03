"use client"

import * as React from "react"
import { Course } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { FeaturedCourseCard } from "@/components/cards/featured-courses/featured-course-card";
import { FeaturedCourseCardSkeleton } from "@/components/skeletons/featured-courses/featured-course-card-skeleton";

interface ContentLibraryProps {
    contents: Course[]
};

export function ContentLibrary({
    contents
}: ContentLibraryProps) {
    if (!contents || contents.length === 0) {
        return <div>Nothing here</div>;
    }

    return (
        <Carousel 
            className="w-full"
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent className="-ml-1">
                {contents.map((content) => (
                <CarouselItem key={content.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                        <React.Suspense
							fallback={Array.from({ length: 3 }).map((_, i) => (
								<FeaturedCourseCardSkeleton key={i} />
							))}
						>
							<FeaturedCourseCard 
                                key={content.id} 
                                course={content} 
                            />
						</React.Suspense>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    );
};