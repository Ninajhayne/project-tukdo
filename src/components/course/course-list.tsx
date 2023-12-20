import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course/course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CourseListProps {
    items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
    items,
}: CourseListProps) => {
    return (
        <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        chaptersLength={item.chapters.length}
                        price={item.price!}
                        progress={item.progress}
                        category={item?.category?.name!}
                        rating={item?.rating}
                        numOfRatings={item?.numOfRatings}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10 h-screen">
                    No courses found
                </div>
            )}
        </div>
    );
};