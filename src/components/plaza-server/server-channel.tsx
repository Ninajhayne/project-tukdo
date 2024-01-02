"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Plaza } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Plaza;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({
    channel,
    server,
    role,
}: ServerChannelProps) => {
    const { onOpen } = useModal();

    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];

    const onClick = () => {
        router.push(`/plaza/servers/${params?.serverId}/channels/${channel.id}`); 
    }

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server });
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full active:text-white hover:bg-[#C44D24] dark:hover:bg-[#C44D24] transition mb-1", params?.channelId === channel.id && "bg-[#F2602D] dark:bg-[#F2602D]"
            )}
        >
            <Icon className ={cn("flex-shrink-0 w-4 h-4 text-foreground active:text-white group-hover:text-white dark:text-white dark:group-hover:text-white transition", params?.channelId === channel.id && "text-white dark:text-white"
            )}
                />
            <p className={cn(
                "line-clamp-1 font-semibold text-xs text-foreground group-hover:text-[#ffffff] dark:text-[#ffffff] dark:group-hover:text-[#ffffff] transition", params?.channelId === channel.id && "text-[#ffffff] dark:text-[#ffffff] dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip
                        label="Edit"
                    >
                        <Edit 
                            onClick={(e) => onAction(e, "editChannel")}
                            className="hidden group-hover:block w-4 h-4 text-[#ffffff] hover:text-[#ffffff] dark:text-[#ffffff] dark:hover:text-[#ffffff] transition"
                        />
                    </ActionTooltip>
                    <ActionTooltip
                        label="Delete"
                    >
                        <Trash 
                            onClick={(e) => onAction(e, "deleteChannel")}
                            className="hidden group-hover:block w-4 h-4 text-[#ffffff] hover:text-[#ffffff] dark:text-[#ffffff] dark:hover:text-[#ffffff] transition"
                        />
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock
                    className ={cn("ml-auto w-4 h-4 text-foreground group-hover:text-white  dark:text-white", params?.channelId === channel.id && "text-white dark:text-white"
                    )}
                />
            )}
        </button>
    )
}