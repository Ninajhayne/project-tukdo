"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

//import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { CheckIcon, LockClosedIcon, TriangleRightIcon } from "@radix-ui/react-icons";


interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean
}

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? LockClosedIcon : (isCompleted ? CheckIcon : TriangleRightIcon);
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/course/${courseId}/chapters/${id}`);
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-x-2 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "bg-slate-200/30 hover:bg-slate-200/20 hover:text-slate-500 border-r-4 border-[#1E1F22] dark:border-[#F0EFE9]",
                isCompleted && "text-emerald-700 hover:text-emerald-700 border-emerald-700 dark:border-emerald-600",
                isCompleted && isActive && "bg-emerald-200/20",
            )}
        >
            <div className="flex items-center gap-x-2 py-4 px-4 w-full overflow-hidden relative">
                <Icon /*size={22}*/ className={cn(isCompleted && "text-emerald-700")} />
                <span className="truncate">
                    {label}
                </span>
                <div className="absolute inset-0 bg-blur opacity-70 filter blur-[2px] pointer-events-none"></div>
            </div>
        </button>

    );
};

/*
"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";


interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean
}

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/course/${courseId}/chapters/${id}`);
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                //"flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-4 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                "flex items-center gap-x-2 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20",
                //isActive && "text-slate-500 bg-slate-200/30 hover:bg-slate-200/20 hover:text-slate-600",
                isActive && "bg-slate-200/30 hover:bg-slate-200/20 hover:text-slate-500 border-r-4 border-[#1E1F22] dark:border-[#F0EFE9]",
                isCompleted && "text-emerald-700 hover:text-emerald-700 border-emerald-700 dark:border-emerald-600",
                isCompleted && isActive && "bg-emerald-200/20",
            )}
        >
            <div className="flex items-center gap-x-2 py-4 px-4">
                <Icon size={22} className={cn(
                    //"text-slate-500",
                    //isActive && "text-slate-500",
                    isCompleted && "text-emerald-700"
                )}/>
                <span>{label}</span>
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-[#1E1F22] dark:border-[#F0EFE9] h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )}/>
            </button>
            );
        };
*/