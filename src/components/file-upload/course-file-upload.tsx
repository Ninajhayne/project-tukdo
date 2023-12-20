"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core"; // Import OurFileRouter type

interface CourseFileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: keyof OurFileRouter; // Adjust the type to use OurFileRouter
}

export const CourseFileUpload = ({
    onChange,
    value,
    endpoint,
}: CourseFileUploadProps) => {
    return (
        <UploadDropzone<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
};

/* Original
"use client";

import { UploadDropzone } from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface CourseFileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: keyof typeof ourFileRouter;
};

export const CourseFileUpload = ({
    onChange,
    endpoint,
}: CourseFileUploadProps) => {
    return (
        <UploadDropzone<typeof ourFileRouter>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}
*/