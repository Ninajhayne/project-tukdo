"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export const ShareLink = () => {
    const { onOpen } = useModal();
    //const apiUrl = window.location.href;
    //let apiUrl: string;
    const [apiUrl, setApiUrl] = useState('');

    useEffect(() => {
        // Accessing window.location.href is safe here.
        setApiUrl(window.location.href);
    }, []);

    return (
        <Button 
            variant="ghost"
            size="sm"
            onClick={() => onOpen("shareLink", { apiUrl })}
        >
            Share <Share className="ml-2 h-4 w-4"/>
        </Button>
    );
};