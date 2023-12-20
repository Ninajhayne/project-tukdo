import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    //{ params }: { params: { firstName: string, lastName: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const values = await req.json();

        const firstName = values.firstName;
        const lastName = values.lastName;

        //console.log("First Name:", firstName);
        //console.log("Last Name:", lastName);

        const clerkUser = await clerkClient.users.getUser(userId);

        const updatedUser = await db.profile.update({
            where: {
                userId: userId,
            },
            data: {
                name: `${firstName} ${lastName}`,
                imageUrl: clerkUser.imageUrl,
            }
        });

        await clerkClient.users.updateUser(userId, {
            firstName: firstName,
            lastName: lastName,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log("[CLERK_USER]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    };
};


export async function POST(
    req: Request,
    //{ params }: { params: { firstName: string } }
) {
    try {
        const values = await req.json();

        const newUser = await db.profile.create({
            data: {
                userId: values.createdUserId,
                name: values.firstName,
                email: values.emailAddress,
                imageUrl: "/images/avatars/asdf.webp"
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.log("[CLERK_USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    };
};


/*
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", {status: 401});
    }

    //console.log("First Name:", params.firstName);
    //console.log("Last Name:", params.lastName);

    
    const clerkUser = await clerkClient.users.getUser(userId);
    
    const updatedUser = await db.profile.update({
        where: {
            userId: userId,
        },
        data: {
            name: `${params.firstName} ${params.lastName}`,
            imageUrl: clerkUser.imageUrl,
        }
    });

    await clerkClient.users.updateUser(userId, params);
    */