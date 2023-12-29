
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/app/_actions/course/get-dashboard-courses";

import { currentProfile } from "@/lib/current-profile";

import { Shell } from "@/components/shells/shell";
import { Calendar } from "@/components/ui/calendar"

import { InfoCard } from "./_components/info-card";

import { Clock, Gem } from "lucide-react";

import { GreetingsCardSpotlight } from "./_components/greetings-card";
import { Progress } from "@/components/ui/progress";
import { DashboardCoursesList } from "./_components/dashboard-courses-list";
import { type Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Dashboard | TUKDO",
    description: "Monitor your course progress",
}

export default async function Dashboard() {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const profile = await currentProfile();

	if (!profile) {
		return redirect("/");
	}

	const {
		completedCourses,
		coursesInProgress
	} = await getDashboardCourses(userId);

	return (
		<Shell variant="sidebar">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<section className="col-span-2 space-y-6">
					<div className="rounded-lg">
						{/*
						<div className="p-4 bg-green-100 rounded-xl">
							<div className="flex flex-col font-bold text-xl text-gray-800 leading-none mt-6">
								<span>Good day,</span>
								<span>{profile.name}</span>
							</div>
						</div>
						*/}
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
							<GreetingsCardSpotlight
								name={profile.name}
							/>
							<div className="grid grid-cols-1">
								{/*
								<div className="rounded-lg">
									<div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-lg">
									<p className="text-xs text-gray-200">Experience</p>
									<p className="text-2xl font-semibold">Experience</p>
									<div className="mt-2 bg-gray-700 rounded-full h-2">
										<div
										className="bg-pink-400 h-2 rounded-full"
										style={{
											width: "67%",
										}}
										/>
									</div>
									</div>
								</div>
								*/}
								<div className="rounded-lg border p-4">
									<p className="text-xs">732 out of 1220 xp</p>
									<p className="text-2xl font-semibold">Experience</p>
									<Progress value={60} className="w-[85%] mt-2" />
								</div>
								<InfoCard
									icon={Clock}
									label="In Progress"
									numberOfItems={coursesInProgress.length}
								/>
								<InfoCard
									icon={Gem}
									label="Completed"
									numberOfItems={completedCourses.length}
									variant="success"
								/>
							</div>
							
						</div>
					</div>
					
					<DashboardCoursesList
						items={[...coursesInProgress, ...completedCourses]}
					/>
				</section>
				
				<aside className="space-y-6 mt-6 md:mt-0">
					<div className="px-4">
						<Calendar 
							className="w-full"
							fixedWeeks
						/>
					</div>
					
					
					<div className="px-2 rounded-lg space-y-2">
						<h2 className="text-xl font-semibold">Events</h2>
						<div className="p-4 rounded-lg border">
							<p className="text-xs text-gray-400">
								Jan 1 - 24
							</p>
							<p className="font-semibold truncate">
								Session with Iasant
							</p>
						</div>
						<div className="p-4 rounded-lg border">
							<p className="text-xs text-gray-400">
								July 1 - 24
							</p>
							<p className="font-semibold truncate">
								Session with Koudelka
							</p>
						</div>
						<div className="p-4 rounded-lg border">
							<p className="text-xs text-gray-400">
								Sept 1 - 24
							</p>
							<p className="font-semibold truncate">
								Group Session
							</p>
							<div className="flex -space-x-2 rtl:space-x-reverse">
								<img className="w-6 h-6 border-2 border-white rounded-full dark:border-black" src="/images/avatars/asdf.webp" alt=""/>
								<img className="w-6 h-6 border-2 border-white rounded-full dark:border-black" src="/images/avatars/asdf.webp" alt=""/>
								<img className="w-6 h-6 border-2 border-white rounded-full dark:border-black" src="/images/avatars/asdf.webp" alt=""/>
								<span 
									className="flex items-center justify-center w-6 h-6 text-[6px] font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
								>
									+99
								</span>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</Shell>
	)
}

/*
<Shell variant="sidebar">
	<PageHeader id="dashboard-header" aria-labelledby="dashboard-header-heading">
		<PageHeaderHeading size="sm">Dashboard</PageHeaderHeading>
	</PageHeader>
	<article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl w-[350px] h-full mx-auto">
		<img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover"/>
		<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
		<h3 className="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
		<div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div>
	</article>
	<div>

		<div className="grid grid-cols-2 gap-4">
			<div className="col-span-2">
			<div className="p-4 bg-green-100 rounded-xl">
				<div className="font-bold text-xl text-gray-800 leading-none">Good day, <br/>Kristin</div>
				<div className="mt-5">
				<button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
					Start tracking
				</button>
				</div>
			</div>
			</div>
			<div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
			<div className="font-bold text-2xl leading-none">20</div>
			<div className="mt-2">Tasks finished</div>
			</div>
			<div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
			<div className="font-bold text-2xl leading-none">5,5</div>
			<div className="mt-2">Tracked hours</div>
			</div>
			<div className="col-span-2">
				<div className="p-4 bg-purple-100 rounded-xl text-gray-800">
					<div className="font-bold text-xl leading-none">Your daily plan</div>
					<div className="mt-2">5 of 8 completed</div>
				</div>
			</div>
		</div>
	</div>
	

	<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
		<InfoCard
			icon={Clock}
			label="In Progress"
			numberOfItems={coursesInProgress.length}
		/>
		<InfoCard
			icon={CheckCircle}
			label="Completed"
			numberOfItems={completedCourses.length}
			variant="success"
		/>
	</div>
	<CoursesList
		items={[...coursesInProgress, ...completedCourses]}
	/>
</Shell>
*/
