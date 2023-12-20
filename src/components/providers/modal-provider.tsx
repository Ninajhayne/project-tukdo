"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/plaza/create-server-modal";
import { InviteModal } from "@/components/modals/plaza/invite-modal";
import { EditServerModal } from "@/components/modals/plaza/edit-server-modal";
import { MembersModal } from "@/components/modals/plaza/members-modal";
import { CreateChannelModal } from "@/components/modals/plaza/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/plaza/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/plaza/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/plaza/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/plaza/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/plaza/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/plaza/delete-message-modal";
import { EditSessionModal } from "@/components/modals/sessions/edit-session-modal";
import { ShareLinkModal } from "@/components/modals/share-link/share-link-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <MessageFileModal />
            <DeleteMessageModal />

            <EditSessionModal/>

            <ShareLinkModal/>
        </>
    )
}