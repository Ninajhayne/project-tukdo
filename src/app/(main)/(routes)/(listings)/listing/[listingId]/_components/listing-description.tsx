"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Preview } from "@/components/text-editor/preview";
import { Separator } from "@/components/ui/separator";

interface ListingDescriptionProps {
    description: string;
};

export const ListingDescription = ({
    description,
}: ListingDescriptionProps) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="mb-4">
            {description!.length > 250 ? (
                <>
                    {showMore ? (
                        <p>{description}</p>
                    ) : (
                        <p>{description.substring(0, 250)} ...</p>
                    )}
                    <Button
                        size="sm"
                        variant="link"
                        onClick={() => setShowMore(!showMore)}
                        className="-ml-3 underline"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </Button>
                </>
            ) : (
                <p>{description}</p>
            )}
        </div>
    );
};

