
//import Link from "next/link";
import { redirect } from "next/navigation"

import { db } from "@/lib/db";
import { toTitleCase } from "@/lib/utils";
import { MentorWithListing } from "@/types";
import { auth } from "@clerk/nextjs";


import { getPurchase } from "@/app/_actions/course/get-purchase";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { MeetMentorCard } from "@/components/cards/meet-mentor-card";
import { CourseRatingsSectionList } from "./_components/course-ratings-section";
import { CourseSidePreview } from "./_components/course-side-preview";
import { CourseDescription } from "./_components/course-description";
import { CourseChapterList } from "./_components/course-chapter-list";
//import { Separator } from "@/components/ui/separator";


//import { VideoPreviewModal2 } from "@/components/modals/course/video-preview-modal-2";
//import { Button } from "@/components/ui/button";
//import { Separator } from "@/components/ui/separator";
//import { ShareLink } from "@/components/share-link/share-link";
//import { CourseRatingModal } from "@/components/modals/course/course-rating-modal";
//import { CourseEnrollButton } from "./chapters/[chapterId]/_components/course-enroll-button";
//import { CourseVideoPreview } from "./_components/course-video-preview";

export async function generateMetadata({
    params
}: {
    params: { courseId: string; }
}) {
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        select: {
            title: true,
            description: true,
        },
    })
  
    if (!course) {
        return {}
    }
  
    return {
      title: toTitleCase(course.title),
      description: course.description ?? undefined,
    }
};

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string; }
}) => {
    
    const { userId } = auth();

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                orderBy: {
                    position: "asc"
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    if(!course) {
        return redirect("/");
    }

    const mentor = await db.profile.findUnique({
        where: {
            userId: course.userId,
        },
        include: {
            listing: true,
        },
    });

    if(!mentor) {
        return redirect("/");
    }

    const purchase = await getPurchase({
        //userId,
        courseId: params.courseId,
    });

    const myRating = await db.courseRating.findUnique({
        where: {
            userId_courseId: {
                courseId: params.courseId,
                userId: userId || "",
            },
        },
    });

    //const progressCount = await getProgress(userId, course.id);
    //console.log("Mentor:", mentor);

    //console.log("Course:", course);
    const mentorRating = await db.listing.findUnique({
        where: {
            mentorId: course.userId
        },
        select: {
            //averageRating: true,
            numOfRatings: true,
            rating: true,
        }
    });

    const numberOfCourses = await db.course.count({
        where: { 
            userId: course.userId, 
        },
    });

    //console.log("Mentor Rating:", mentorRating);
    //console.log("Number of Courses:", numberOfCourses);
    return (
        <>
            <Breadcrumbs
                segments={[
                {
                    title: "Courses",
                    href: "/courses",
                },
                {
                    title: toTitleCase(course.category?.name!),
                    href: `/courses?categoryId=${course.categoryId}`,
                },
                {
                    title: "Preview",
                    href: `/course/${course.id}`,
                },
                ]}
                className="pb-0 xs:pb-4 lg:pb-0 pt-6 md:py-8 container"
            />
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 pb-8 pt-6 md:py-8 container order-2 md:order-1">
                    <section>
                        <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-4 order-2 md:order-1">
                            {course.title}
                        </h1>
                        <CourseDescription
                            course={course}
                            mentorName={mentor.name}
                            mentorImageUrl={mentor.imageUrl}
                        />
                    </section>

                    <section>
                        <CourseChapterList
                            course={course}
                        />
                    </section>
                    
                    {mentor.listing && (
                        <MeetMentorCard
                            mentor={mentor as MentorWithListing}
                            mentorRating={mentorRating}
                            numberOfCourses={numberOfCourses}
                        />
                    )}

                    <section className="mt-4">
                        <CourseRatingsSectionList
                            course={course}
                        />
                    </section>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 order-1 md:order-2">
                    {/*
                    <CourseSidePreview
                        course = {course}
                        purchase = {purchase}
                        myRating = {myRating}
                        userId = {userId}
                    />
                    */}
                    <div /*className="sticky top-20"*/>                        
                        <CourseSidePreview
                            course = {course}
                            purchase = {purchase}
                            myRating = {myRating}
                            userId = {userId}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};  
 
export default CourseIdPage;

/*
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 order-1 md:order-2">
    <CourseVideoPreview
        course={course}
    />
    <Separator className="my-4"/>
    <div className="mt-2 flex flex-col justify-center items-center">
        {purchase ? (
            <Link href={`/course/${course.id}/chapters/${course.chapters[0].id}`}>
                <Button className="w-full">
                    View
                </Button>
            </Link>
            ) : (
            <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
            />
        )}

        <Link href={`/course/${course.id}/chapters/${course.chapters[0].id}`}>
            View
        </Link>
        
        <Separator className="my-2"/>
        <div className="flex items-center justify-center mt-2">
            <CourseRatingModal
                initialData={myRating}
                courseId={course.id}
                userId={userId}
            />
            <ShareLink/>
        </div>
        
    </div>
    
</div>
*/