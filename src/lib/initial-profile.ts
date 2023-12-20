import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const InitialProfile = async () => {
    const user = await currentUser();

    if(!user) {
      return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
          userId: user.id
        },
        select: {
          id: true,
          userId: true,
          name: true,
          imageUrl: true,
          email: true,
          // Other fields you want to retrieve
        },
    });
    
    if (profile) {
      return profile;
    } else {
      const newProfile = await db.profile.create({
          data: {
              userId: user.id,
              name: `${user.firstName} ${user.lastName}`,
              imageUrl: "/images/avatars/asdf.webp",
              email: user.emailAddresses[0].emailAddress
          }
      })

      return newProfile;
    }

    
    
    /* New
    if (profile) {
        // Profile already exists, update it with user data
        const updatedProfile = await db.profile.update({
          where: {
            userId: user.id,
          },
          data: {
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
          },
        });
    
        return updatedProfile;
    } else {
        // Profile doesn't exist, create a new one
        const newProfile = await db.profile.create({
          data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
          },
        });
    
        return newProfile;
    }
    */
};

