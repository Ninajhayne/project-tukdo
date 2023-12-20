import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { EditAccountForm } from "./edit-account-form";

const ProfileEditor = async () => {
    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const user = await db.profile.findFirst({
        where: {
          userId,
        },
    });

    if(!user) {
        return redirect("/");
    }

    return (
        <EditAccountForm
            user={user}
            userName={user.name}
        />
    );
}
 
export default ProfileEditor;