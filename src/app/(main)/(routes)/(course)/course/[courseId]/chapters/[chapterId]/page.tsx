
import { db } from "@/lib/db";
import { toTitleCase } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { File } from "lucide-react";

import { getProgress } from "@/app/_actions/course/get-progress";
import { getChapter } from "@/app/_actions/course/get-chapter";
import { Separator } from "@/components/ui/separator";

import { Preview } from "@/components/text-editor/preview";
import { Banner } from "@/components/course/banner";

import { CourseSidebar } from "../../_components/course-sidebar";
import { CourseNavbar } from "../../_components/course-navbar";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

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
  
    const modifiedTitle = toTitleCase(course.title) + " | Chapters";

    return {
        title: modifiedTitle,
        description: course.description ?? undefined,
    };
};

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string;}
}) => {
    const { userId } = auth();

    if(!userId) {
        return redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },  
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        }
                    }
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

    const {
        chapter,
        //course,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if(!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    const progressCount = await getProgress(userId, course.id);

    return (
        <div className="flex-1 items-start md:grid md:grid-cols-[300px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-2">
            <div className="h-[80px] md:hidden fixed inset-y-0 w-full z-50"> 
                <CourseNavbar course={course} progressCount={progressCount} />
            </div>
            
            <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                <CourseSidebar course={course} progressCount={progressCount} />
            </aside>

            <div className="h-full">
                <div className="flex flex-col max-w-4xl mx-auto pb-20">
                    <div>
                        {chapter.videoUrl && (
                            <VideoPlayer
                                chapterId={params.chapterId}
                                courseId={params.courseId}
                                nextChapterId={nextChapter?.id}
                                isLocked={isLocked}
                                completeOnEnd={completeOnEnd}
                                videoUrl={chapter.videoUrl}
                            />
                        )}
                    </div>
                    <div>
                        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                            <h2 className="text-2xl font-semibold mb-2">
                                {chapter.title}
                            </h2>
                            {purchase ? (
                                <CourseProgressButton
                                    chapterId={params.chapterId}
                                    courseId={params.courseId}
                                    nextChapterId={nextChapter?.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                />
                                ) : (
                                <CourseEnrollButton
                                    courseId={params.courseId}
                                    price={course.price!}
                                    userId={userId}
                                />
                            )}
                        </div>
                        {userProgress?.isCompleted && (
                            <Banner variant="success" label="You already completed this chapter" />
                        )}
                        
                        {isLocked && (
                            <Banner variant="warning" label="You need to purchase this course to watch this chapter." />
                        )}
                        <Separator />
                        <div>
                            <Preview value={chapter.description!} className="text-gray-800 dark:text-white" />
                        </div>
                        {!!attachments.length && (
                            <>
                            <Separator />
                            <div className="p-4">
                                {attachments.map((attachment) => (
                                <a 
                                    href={attachment.url}
                                    target="_blank"
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                >
                                    <File />
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>
                                </a>
                                ))}
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default ChapterIdPage;