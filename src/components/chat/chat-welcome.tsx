import { Hash } from "lucide-react";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
};

export const ChatWelcome = ({
    name,
    type,
}: ChatWelcomeProps) => {
    return (
        <div className="space-y-2 px-4 mb-4 text-center justify-center">
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-[#F2602D] dark:bg-[#F2602D] flex items-center justify-center mx-auto">
                    <Hash className="h-12 w-12 text-white"/>
                </div>
            )}
            <p className="text-xl md:text-2xl font-bold">
                {type === "channel" ? "Welcome to #" : ""}
                {name}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {type === "channel"
                    ? `This is the start of the channel.`
                    :  `This is the start of your conversation with ${name}`
                }
            </p>
        </div>
    )
}