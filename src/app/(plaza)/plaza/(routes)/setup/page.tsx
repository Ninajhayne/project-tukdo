import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";

import { InitialModal } from "@/components/modals/plaza/initial-modal";
const CreatePlaza = async () => {
    
    const profile = await InitialProfile();

    const server = await db.plaza.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/plaza/servers/${server.id}`);
    }
    
    return <InitialModal/>;
}
 
export default CreatePlaza;