import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

//import { siteConfig } from "@/config/site"
//import { Icons } from "@/components/icons"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { SignUpForm } from "@/components/forms/signup-form"
import { Shell } from "@/components/shells/shell";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Sign Up | TUKDO",
    description: "Sign up for an account",
}

export default async function SignUpPage() {
    const user = await currentUser()
    if (user) redirect("/")

    return (
        <Shell className="max-w-lg">
            <Card>
                
                <CardHeader className="space-y-1 items-center text-center">
                    <CardTitle className="text-2xl">
                        <span className="text-[#F2602D]">Sign</span> <span className="text-[#00528A]"> Up</span>
                    </CardTitle>
                    <CardDescription>
                        Choose your preferred sign up method  
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <OAuthSignIn />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                        </div>
                    </div>
                    <SignUpForm />
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground text-center">
                        Already have an account?{" "}
                        <Link
                            aria-label="Sign in"
                            href="/sign-in"
                            className="text-primary underline-offset-4 transition-colors hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </Shell>
    )
}