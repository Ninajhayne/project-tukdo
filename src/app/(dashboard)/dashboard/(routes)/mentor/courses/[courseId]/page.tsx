import { redirect } from "next/navigation";
import type { Metadata } from "next"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form.tsx";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/course/banner";
import { Actions } from "./_components/actions";
import Image from "next/image";

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Course Setup  | TUKDO",
    description: "Manage your own course",
}

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string }
}) => {
    const { userId } = auth();  

    if(!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!course) {
        return redirect("/");
    };

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner
                    label="This course is unpublished. It will not be visible to the students."
                />
            )}
                <PageHeader
                        id="course-setup-page-header"
                        aria-labelledby="course-setuppage-header-heading"
                        className="rounded-lg shadow-sm bg-[#F2602D] flex items-center mb-4"
                    >
                        <div className="p-6">
                            <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Course Setup</PageHeaderHeading>
                            <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                                Complete all fields {completionText}
                            </PageHeaderDescription>
                        </div>
                        <div className="ml-auto flex-shrink- mr-6">
                            <Image
                                src="/images/header/girl.png"
                                alt=""
                                width={100}
                                height={100}
                                className="w-32 h-28 object-cover"
                                loading="lazy"
                            />
                        </div>
                    </PageHeader>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                    />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <h2 className="text-xl">
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Course Chapters
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Sell your course
                                </h2>
                            </div>
                            <PriceForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <h2 className="text-xl">
                                    Resources & Attachments
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                        
                    </div>
                </div>
        </>
        
    );
}
 
export default CourseIdPage;