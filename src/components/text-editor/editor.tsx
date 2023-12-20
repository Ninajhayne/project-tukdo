"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

import { Skeleton } from "@/components/ui/skeleton";

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
    className: string;
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
    ],
};
  
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote"];

export const Editor = ({
    onChange,
    value,
    className,
}: EditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { 
        ssr: false,
        loading: () => <Skeleton className="h-16" />
    }), []);

    return (
        <div>
            <ReactQuill 
                theme="snow"
                value={value}
                onChange={onChange}
                className={className}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};