
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";

import { db } from "@/lib/db";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/livekit/media-room";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}


const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            plazaId: params.serverId,
            profileId: profile.id,
        }
    });

    if(!channel || !member) {
        redirect("/plaza");
    }



    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={channel.plazaId}
                type="channel"
            />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/plaza/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.plazaId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.plazaId,
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    video={true}
                    audio={false}
                />
            )}
        </div>
    );
}
 
export default ChannelIdPage;