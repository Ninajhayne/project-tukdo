
import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
};

export const CourseNavbar = ({
    course,
    progressCount,
}: CourseNavbarProps) => {
    return (
        <div className="p-4 boder-b h-full flex items-center bg-white dark:bg-black shadow-sm">
            <CourseMobileSidebar 
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </div>
    );
};

