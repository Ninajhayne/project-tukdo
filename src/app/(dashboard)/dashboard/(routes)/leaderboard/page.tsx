

import type { Metadata } from "next"
import Image from "next/image";
import { unstable_cache as cache } from "next/cache"
import { Shell } from "@/components/shells/shell"
import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { columns2 } from "./_components/columns2";
import { DataTable2 } from "./_components/data-table2";

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Leaderboard | TUKDO",
    description: "",
}

const LeaderboardPage = async () => {
    const someCourses = await cache(
		async () => {
			return db.course.findMany({
				take: 10,
				where: {
					isPublished: true,
				}, 
				orderBy: [
					{
						rating: 'desc',
					},
					{
						updatedAt: 'desc', 
					},
				],
			});
		},
		["lobby-courses"],
		{
			revalidate: 3600,
			tags: ["lobby-courses"],
		}
	)()
	const someMentors = await cache(
		async () => {
			return db.listing.findMany({
				take: 10,
				where: {
					isListed: true,
				},
				orderBy: [
					{
						rating: 'desc',
					},
					{
						updatedAt: 'desc',
					},
				],
		include: {
			mentor: {
			select: {
				imageUrl: true,
				name: true,
			},
			},
		},
			});
		},
		["lobby-mentors"],
		{
			revalidate: 3600,
			tags: ["lobby-mentors"],
		}
	)()

    return (
        <Shell variant="sidebar" as="div">
			<PageHeader id="leaderboard-header" aria-labelledby="leaderboard-header-heading" className="rounded-lg shadow-sm bg-[#F2602D] flex items-center gap-x-2">
				<div className="p-6">
					<PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Leaderboard</PageHeaderHeading>
					<PageHeaderDescription size="sm" className="text-[#FFFFFF]">
						Highlighting exceptional tutors and courses for their outstanding contributions.
					</PageHeaderDescription>
				</div>
				<div className="ml-auto flex-shrink- mr-6">
					<Image
						src="/images/header/owl.png"
						alt=""
						width={100}
						height={100}
						className="w-32 h-28 object-cover"
						loading="lazy"
					/>
				</div>
			</PageHeader>
			<div className="grid gap-6 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

			<section
				id="billing-info"
				aria-labelledby="billing-info-heading"
				className="space-y-5"
			>
				<h2 className="flex text-xl font-semibold sm:text-2xl gap-2">Top 10 Courses</h2>
				
				<div>
					<DataTable columns={columns} data={someCourses} />
				</div>
			</section>

			<section
				id="billing-info"
				aria-labelledby="billing-info-heading"
				className="space-y-5"
			>
				<h2 className="flex text-xl font-semibold sm:text-2xl gap-2">Top 10 Tutors</h2>
				
				<div>
					<DataTable2 columns={columns2} data={someMentors} />
				</div>
			</section>
		</div>
      
        </Shell>
    )
}

export default LeaderboardPage;
