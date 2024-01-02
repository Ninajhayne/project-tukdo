import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function SignOutPage() {
    return (
        <Shell className="max-w-lg">
            <Card>
                
                <CardHeader className="space-y-1 items-center text-center">
                    <CardTitle className="text-2xl">
                        <span className="text-[#F2602D]">Sign</span> <span className="text-[#00528A]"> Out</span>
                    </CardTitle>
                    <CardDescription>
                        Are you sure you want to sign out?
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
    
            <LogOutButtons />
            </CardContent>
            </Card>
        </Shell>
    )
}
