import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import {
    PageHeader,
} from "@/components/page-header"

export default function AccountLoading() {
    return (
        <Shell variant="sidebar">
            <PageHeader id="account-header" aria-labelledby="account-header-heading" className="rounded-lg shadow-sm flex items-center gap-x-2">
                <div className="p-6 space-y-2 rounded-lg border">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </PageHeader>
            <div className="grid gap-10 rounded-lg border p-4">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-8 w-52" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-8 w-52" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-8 w-52" />
                </div>
            </div>
        </Shell>
    )
}
