"use client";


import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

//import { Trash } from "lucide-react";
//import { ConfirmModal } from "@/components/modals/course/confirm-modal";
import { Button } from "@/components/ui/button";

interface MentorProfileActionsProps {
    disabled: boolean;
    listingId: string;
    isListed: boolean;
};

export const MentorProfileActions = ({
    disabled,
    listingId,
    isListed,
}: MentorProfileActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isListed) {
                await axios.patch(`/api/mentor/listings/${listingId}/unlist`);
                toast.success("Unlisted");
            } else{
                await axios.patch(`/api/mentor/listings/${listingId}/list`);
                toast.success("Listed");
                confetti.onOpen();
            };

            router.refresh();
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        };
    };
    /*
    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/mentor/listings/${listingId}`);

            toast.success("Deleted");
            router.refresh();
            router.push(`/dashboard/mentor/profile/new`);
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        };
    };
    */
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                size="sm"
            >
                {isListed ? "Unlist" : "List"}
            </Button>
            {/*
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" variant="outline">
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
            */}
        </div>
    );
};