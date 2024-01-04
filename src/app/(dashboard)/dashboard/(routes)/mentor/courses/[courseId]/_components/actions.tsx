"use client";


import axios from "axios";
//import toast from "react-hot-toast";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

import { Trash } from "lucide-react";
import { ConfirmModal } from "@/components/modals/course/confirm-modal";
import { Button } from "@/components/ui/button";



interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const Actions = ({
    disabled,
    courseId,
    isPublished,
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else{
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
            };

            router.refresh();
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        };
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/dashboard/mentor/courses`);
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="flex items-center justify-end gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="default"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>

            <ConfirmModal onConfirm={onDelete}>
                <Button 
                    size="sm"
                    variant="error"
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    );
};