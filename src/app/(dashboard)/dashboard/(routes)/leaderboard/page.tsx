import type { Metadata } from "next"
import Image from "next/image";
import { unstable_cache as cache } from "next/cache"

import { IoTrophySharp } from "react-icons/io5";


import { DataTable } from "./_components/data-table";
import  { columns } from "./_components/columns";

import { DataTable2 } from "./_components/data-table2";
import  { columns2 } from "./_components/columns2";
import { db } from "@/lib/db";

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
//import { getSubscriptionPlanAction } from "@/app/_actions/stripe"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Leaderboard | TUKDO",
    description: "",
}

export default async function LeaderboardPage() {
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
        <section
            id="billing-info"
            aria-labelledby="billing-info-heading"
            className="space-y-5"
        >
            <h2 className="flex text-xl font-semibold sm:text-2xl gap-2">Top Courses <IoTrophySharp color={"#FFE600"} size={"2rem"}/></h2>
            
            <div>
                <DataTable columns={columns} data={someCourses} />
            </div>
        </section>

        <section
            id="billing-info"
            aria-labelledby="billing-info-heading"
            className="space-y-5"
        >
            <h2 className="flex text-xl font-semibold sm:text-2xl gap-2">Top Tutors <IoTrophySharp color={"#FFE600"} size={"2rem"}/></h2>
            
            <div>
                <DataTable2 columns={columns2} data={someMentors} />
            </div>
        </section>
      
        </Shell>
    )
}
