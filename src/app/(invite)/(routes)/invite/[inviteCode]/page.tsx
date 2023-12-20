import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string; 
    };
};

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    //const initialize = await InitialProfile();
    const profile = await currentProfile();

    
    if(!profile) {
        return redirectToSignIn();
    }
    
    /*
    if(!profile) {
        return redirect("/sign-in");
    }
    */

    if(!params.inviteCode) {
        return redirect("/");
    }

    const existingServer = await db.plaza.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(existingServer) {
        return redirect(`/plaza/servers/${existingServer.id}`);
    }

    const server = await db.plaza.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    if(server) {
        return redirect(`/plaza/servers/${server.id}`);
    }

    return null;
}
 
export default InviteCodePage;