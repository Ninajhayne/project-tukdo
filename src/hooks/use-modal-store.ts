import { Channel, ChannelType, Plaza } from "@prisma/client";
import { create } from "zustand";

export type ModalType = 
    "createServer" 
    | "invite" 
    | "editServer" 
    | "members" 
    | "createChannel" 
    | "leaveServer" 
    | "deleteServer" 
    | "deleteChannel" 
    | "editChannel"
    | "messageFile"
    | "deleteMessage"
    | "videoPreview"
    | "editSession"
    | "shareLink";

interface ModalData {
    server?: Plaza;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;

    reservation?: any;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));

