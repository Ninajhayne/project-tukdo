"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Radio, Snail } from "lucide-react";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if(!isConnected) {
        return(
            <Badge variant="outline" className="bg-yellow-600 text-white border-none">
                <Snail className="w-4 h-4 animate-pulse" />
            </Badge>
        )
    }
    return(
        <Badge variant="outline" className="bg-emerald-600 text-white border-none">
            <Radio className="w-4 h-4 animate-pulse" />
        </Badge>
    )
}
