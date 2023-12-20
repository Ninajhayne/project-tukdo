import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course/course-card";
import { Separator } from "@/components/ui/separator";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CourseListProps {
    items: CourseWithProgressWithCategory[];
}

export const DashboardCoursesList = ({
    items,
}: CourseListProps) => {
    return (
        <div>
            <h2 
                className="text-xl font-semibold"
            >
                Collections
            </h2>
            <Separator
            />
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
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
                <div className="text-center text-sm text-muted-foreground mt-10">
                    Still empty
                </div>
            )}
        </div>
    );
};