import { type Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VerifyEmailForm } from "@/components/forms/verify-email-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Verify Email | TUKDO",
    description: "Verify your email address to continue with your sign up",
}

export default function VerifyEmailPage() {
    return (
        <Shell className="max-w-lg">
            <Card>
                <CardHeader className="space-y-1 items-center text-center">
                    <CardTitle className="text-2xl">
                        <span className="text-[#F2602D]">Verify your</span> <span className="text-[#00528A]"> email address</span>
                    </CardTitle>
                    <CardDescription>
                        We emailed you a six-digit code. Please enter the code below to complete your account creation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <VerifyEmailForm />
                </CardContent>
            </Card>
        </Shell>
    )
}
