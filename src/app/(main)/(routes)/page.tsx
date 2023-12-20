import * as React from "react"
import { unstable_cache as cache } from "next/cache"
import Link from "next/link"

import { db } from "@/lib/db";
import { cn } from "@/lib/utils"
import { Balancer } from "react-wrap-balancer"

//import { siteConfig } from "@/config/site"

import { courseCategories } from "@/config/courses"

//import SponsorsSection from "@/components/sponsors"
import { Badge } from "@/components/ui/badge"
import { Shell } from "@/components/shells/shell"
import { buttonVariants } from "@/components/ui/button"
import { CourseCategoryCard } from "@/components/cards/course-category-card"
import { FeaturedMentorCard } from "@/components/cards/featured-metors/featured-mentor-card";
import { FeaturedMentorSkeleton } from "@/components/skeletons/featured-mentor/featured-mentor-card-skeleton";

import { FeaturedCourseCard } from "@/components/cards/featured-courses/featured-course-card";
import { FeaturedCourseCardSkeleton } from "@/components/skeletons/featured-courses/featured-course-card-skeleton";


import { SiAtari } from "react-icons/si";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function IndexPage() {
    const someCourses = await cache(
		async () => {
			return db.course.findMany({
				take: 8,
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
				take: 4,
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
		<Shell className="gap-12" /*className="max-w-6xl pt-0 md:pt-0"*/>
			<section
				id="hero"
				aria-labelledby="hero-heading"
				className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
			>
				
				<Link href="https://www.loglib.io/s/tukdo" target="_blank" rel="noreferrer">
					<Badge
						aria-hidden="true"
						className="rounded-md px-3.5 py-1.5"
						variant="secondary"
					>
						<SiAtari className="mr-2 h-3.5 w-3.5" />
						Web Vitals
					</Badge>
					<span className="sr-only">Meet the teams</span>
				</Link>
				<h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
					An E-Learning Community Platform
				</h1>
				<Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
					Designed to meet your diverse educational needs.
				</Balancer>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Link
						href="/courses"
						className={cn(
						buttonVariants({
							size: "lg",
						})
						)}
					>
						Browse Courses
					</Link>
					<Link
						href="/listings"
						className={cn(
						buttonVariants({
							variant: "outline",
							size: "lg",
						})
						)}
					>
						Find Mentors
					</Link>
				</div>
			</section>
			<section
				id="categories"
				aria-labelledby="categories-heading"
				className="space-y-6 py-8 md:pt-10 lg:pt-24"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
						Categories
					</h2>
					<Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Find curated content that suits your learning journey.
					</Balancer>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{courseCategories.map((category) => (
						<CourseCategoryCard key={category.title} category={category} />
					))}
				</div>
			</section>
			
			<section
				id="become-a-mentor-banner"
				aria-labelledby="become-a-mentor-banner-heading"
				className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
			>
				<h2 className="text-2xl font-medium sm:text-3xl">
					Do you want to teach on our website?
				</h2>
				<Link href="/become-a-mentor">
					<div className={cn(buttonVariants())}>
						Be a mentor
						<span className="sr-only">Be a mentor</span>
					</div>
				</Link>	
			</section>
			{/*
				<SponsorsSection/>
			*/}
			<section
				id="featured-courses"
				aria-labelledby="featured-courses-heading"
				className="space-y-6 pt-8 md:pt-10 lg:pt-12"
			>
				<div className="flex items-center justify-between gap-4">
					<div className="max-w-[58rem] flex-1 space-y-1">
						<h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
							Featured courses
						</h2>
						<Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Explore the best courses
						</Balancer>
					</div>
					<Link
						href="/courses"
						className={cn(
						buttonVariants({
						variant: "ghost",
						className: "hidden sm:flex",
						})
						)}
					>
						View all courses
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all courses</span>
					</Link>
				</div>
				<div className="space-y-8">
					<div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<React.Suspense
							fallback={Array.from({ length: 8 }).map((_, i) => (
								<FeaturedCourseCardSkeleton key={i} />
							))}
						>
							{someCourses.map((course) => (
								<FeaturedCourseCard 
									key={course.id} 
									course={course} 
								/>
							))}
						</React.Suspense>
					</div>
					<Link
						href="/courses"
						className={cn(
						buttonVariants({
							variant: "ghost",
							className: "mx-auto flex w-fit sm:hidden",
						})
						)}
					>
						View all courses
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all courses</span>
					</Link>
				</div>
			</section>
			<section
				id="featured-mentors"
				aria-labelledby="featured-mentors-heading"
				className="space-y-6 pt-8 md:pt-10 lg:pt-12"
			>
				<div className="flex items-center justify-between gap-4">
					<div className="max-w-[58rem] flex-1 space-y-1">
						<h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
							Featured Mentors
						</h2>
						<Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Explore mentors from around the world
						</Balancer>
					</div>
					<Link
						href="/listings"
						className={cn(
						buttonVariants({
							variant: "ghost",
							className: "hidden sm:flex",
						})
						)}
					>
						View all mentors
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all mentors</span>
					</Link>
				</div>
				<div className="space-y-8">
					<div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<React.Suspense
							fallback={Array.from({ length: 4 }).map((_, i) => (
								<FeaturedMentorSkeleton key={i} />
							))}
						>
							{someMentors.map((mentor) => (
								<FeaturedMentorCard
									key={mentor.id}
									featuredMentor={mentor}
									href={`/listing/${mentor.id}`}
								/>
							))}
						</React.Suspense>
					</div>
					<Link
						href="/listings"
						className={cn(
						buttonVariants({
							variant: "ghost",
							className: "mx-auto flex w-fit sm:hidden",
						})
						)}
					>
						View all mentors
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all mentors</span>
					</Link>
				</div>
			</section>
		</Shell>
	)
}