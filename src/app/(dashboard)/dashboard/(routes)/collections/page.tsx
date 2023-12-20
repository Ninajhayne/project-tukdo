import type { Metadata } from "next"
import { redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Collections",
	description: "Manage your collections",
}

interface CollectionsPageProps {
	searchParams: {
	[key: string]: string | string[] | undefined
	}
}

export default async function CollectionsPage({
	searchParams,
}: CollectionsPageProps) {

    return (
        <Shell variant="sidebar">
			<PageHeader
				id="dashboard-collections-header"
				aria-labelledby="dashboard-collections-header-heading"
				separated
			>
				<PageHeaderHeading size="sm">Collections</PageHeaderHeading>
				<PageHeaderDescription size="sm">
				Manage your collection
				</PageHeaderDescription>
			</PageHeader>
            Nice
        </Shell>
    )
}
