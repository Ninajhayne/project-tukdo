import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseLayout = async ({
    children,
    //params,
}: {
    children: React.ReactNode;
    //params: { courseId: string };
}) => {
    

    return (
        <main>
            {children}
        </main>
    );
}
 
export default CourseLayout;

/*
const course = await db.course.findUnique({
    where: {
        id: params.courseId
    },
    include: {
        chapters: {
            where: {
                isPublished: true,
            },
            orderBy: {
                position: "asc"
            }
        }
    }
});

if(!course) {
    return redirect("/");
}
*/