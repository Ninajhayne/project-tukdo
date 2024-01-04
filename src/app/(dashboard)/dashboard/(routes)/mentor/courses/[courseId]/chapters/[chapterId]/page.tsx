import Link from "next/link";
import { redirect } from "next/navigation";


import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { ArrowLeft } from "lucide-react";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/course/banner";
import { ChapterActions } from "./_components/chapter-actions";
import Image from "next/image";
import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string; }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
    });

    if (!chapter) {
        return redirect("/");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!chapter.isPublished && (
                <Banner
                    variant="warning"
                    label="This chapter is unpublished. It will not be visible in the course"
                />
            )}
                    <PageHeader
                        id="chapter-setup-page-header"
                        aria-labelledby="chapter-setuppage-header-heading"
                        className="rounded-lg shadow-sm bg-[#F2602D] flex items-center mb-4"
                    >
                        <div className="p-6">
                            <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Chapter Creation</PageHeaderHeading>
                            <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                                Complete all fields {completionText}
                            </PageHeaderDescription>
                        </div>
                        <div className="ml-auto flex-shrink- mr-6">
                            <Image
                                src="/images/header/owl.png"
                                alt=""
                                width={100}
                                height={100}
                                className="w-32 h-28 object-cover"
                                loading="lazy"
                            />
                        </div>
                    </PageHeader>
                    <div className="flex items-center justify-between gap-x-2">
                        <Link 
                            href={`/dashboard/mentor/courses/${params.courseId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2 text-[#F2602D]"/>
                            Back to course setup
                        </Link>
                        <ChapterActions
                                disabled={!isComplete}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                    </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Customize your Chapter
                                </h2>
                            </div>
                            <ChapterTitleForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <h2 className="text-xl">
                                Add a video
                            </h2>
                        </div>
                        <ChapterVideoForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                </div>
        </>
    );
};
 
export default ChapterIdPage;