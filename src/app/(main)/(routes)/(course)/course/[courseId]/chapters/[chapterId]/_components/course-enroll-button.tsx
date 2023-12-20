"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
    userId: string | null;
}

export const CourseEnrollButton = ({
    price,
    courseId,
    userId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(!userId) {
                //toast.error("You must be signed in");
                toast.error("You must be signed in", {
                    action: {
                        label: 'Sign-in',
                        onClick: () => {
                            router.push('/sign-in');
                        },
                    },
                });
                setIsLoading(false);
                return;
            };

            const response = await axios.post(`/api/courses/${courseId}/checkout`)

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto"
        >
            {!price ? "Enroll for Free" : `Enroll for ${formatPrice(price)}`}
        </Button>
    )
}