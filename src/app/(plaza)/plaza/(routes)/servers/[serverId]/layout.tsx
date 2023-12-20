import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ServerSideBar } from "@/components/plaza-server/server-sidebar";

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverId: string }
}) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    const server = await db.plaza.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(!server) {
        return redirect("/plaza/setup");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSideBar
                    serverId={params.serverId}
                />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
            
        </div>
    );
}
 
export default ServerIdLayout;