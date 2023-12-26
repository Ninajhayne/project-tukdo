import type { Metadata } from "next"

import { db } from "@/lib/db";

import { Shell } from "@/components/shells/shell";
import { auth } from "@clerk/nextjs";
import { getCourses } from "@/app/_actions/course/get-courses";
import { CoursesList } from "@/components/course/course-list";

import CoursesCategories from "./_components/course-category";
import CourseFilters from "./_components/course-filters";

interface CoursesPageProps {
    searchParams: {
        title?: string;
        categoryId?: string;
        price_range?: string;
    }
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Courses | TUKDO",
    description: "All the courses we have to offer",
}

export default async function CoursesPage({
    searchParams,
}: CoursesPageProps) {
    const { userId } = auth();

    const courseCategories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId: userId || "",
        ...searchParams,
    });

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
                            <CoursesCategories
                                items={courseCategories}
                                searchParams={searchParams}
                            />
                        </div>
                    </div>
                    <div className="ml-6 xs:ml-6 lg:ml-9 xl:ml-12">
                        <CourseFilters
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            </section>
            
            {/*
            <Sheet>
                <SheetTrigger asChild>
                    <Button aria-label="Filter products" size="sm">
                        Filter
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader className="px-1">
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <Separator className="my-4" />
                    <SheetFooter>
                        <Button
                            aria-label="Clear filters"
                            size="sm"
                            className="w-full"
                        >
                        Clear Filters
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            */}
            
            <Shell>
                <CoursesList
                    items={courses}
                />  
            </Shell>
        </>
    );
};

/*
<div>
    <CoursesCategories
        items={courseCategories}
    />
    <Shell>
        <CoursesList
            items={courses}
        />
    </Shell>
</div>
*/
