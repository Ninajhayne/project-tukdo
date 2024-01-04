import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export default function BillingLoading() {
	return (
		<Shell variant="sidebar" as="div">
			<PageHeader id="account-header" aria-labelledby="account-header-heading" className="rounded-lg shadow-sm flex items-center gap-x-2">
				<div className="p-6 space-y-2 rounded-lg border">
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
			</PageHeader>
			<section className="space-y-5">
				<h2 className="text-xl font-semibold sm:text-2xl"></h2>
				<Card className="grid gap-4 p-6">
				<Skeleton className="h-6 w-1/2" />
				<Skeleton className="h-4 w-1/4" />
				</Card>
			</section>
			<section className="space-y-5 pb-2.5">
				<h2 className="text-xl font-semibold sm:text-2xl">
				</h2>
				<div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<Card
					key={i}
					className={cn(
						"flex flex-col",
						i === 2 && "lg:col-span-2 xl:col-span-1"
					)}
					>
					<CardHeader>
						<Skeleton className="h-6 w-10" />
						<Skeleton className="h-4 w-full" />
					</CardHeader>
					<CardContent className="grid flex-1 place-items-start gap-6">
						<Skeleton className="h-7 w-16" />
						<div className="w-full space-y-2">
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="flex items-center gap-2">
							<Skeleton className="h-4 w-4" />
							<Skeleton className="h-4 w-4/5" />
							</div>
						))}
						</div>
					</CardContent>
					<CardFooter className="pt-4">
						<Skeleton className="h-6 w-1/2" />
					</CardFooter>
					</Card>
				))}
				</div>
			</section>
		</Shell>
	)
}
