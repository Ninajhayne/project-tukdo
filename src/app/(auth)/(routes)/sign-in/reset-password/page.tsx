import { type Metadata } from "next"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Reset Password | TUKDO",
    description: "Enter your email to reset your password",
}

export default function ResetPasswordPage() {
    return (
        <Shell className="max-w-lg">
            <Card>
                <CardHeader className="space-y-1 items-center text-center">
                    <CardTitle className="text-2xl">
                        <span className="text-[#F2602D]">Reset</span> <span className="text-[#00528A]"> Password</span>
                    </CardTitle>
                    <CardDescription>
                        Enter your email address and we will send you a verification code
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm />
                </CardContent>
            </Card>
        </Shell>
    )
}