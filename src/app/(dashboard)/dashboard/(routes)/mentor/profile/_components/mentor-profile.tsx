"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { User } from "@clerk/nextjs/dist/types/server"
import { Profile } from "@prisma/client";

interface MentorProfileDashboardProps {
    user: User | null
    userId: string;
    profile: Profile | null;
};

const MentorProfileDashboard = ({
    user,
}:MentorProfileDashboardProps) => {
    const initials = `${user?.firstName?.charAt(0) ?? ""} ${
        user?.lastName?.charAt(0) ?? ""
    }`

    const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

    return (
        <div>
            <div className="mt-4">
                <div className="w-full mx-auto">
                    <Avatar className="h-20 w-20">
                        <AvatarImage
                            src={user?.imageUrl}
                            alt={user?.username ?? ""}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col space-y-1 mt-2">
                    <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {email}
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default MentorProfileDashboard;