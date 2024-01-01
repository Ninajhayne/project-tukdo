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
import Image from "next/image"

import { CourseCategoryCard } from "@/components/cards/course-category-card"
import { FeaturedMentorCard } from "@/components/cards/featured-metors/featured-mentor-card";
import { FeaturedMentorSkeleton } from "@/components/skeletons/featured-mentor/featured-mentor-card-skeleton";

import { FeaturedCourseCard } from "@/components/cards/featured-courses/featured-course-card";
import { FeaturedCourseCardSkeleton } from "@/components/skeletons/featured-courses/featured-course-card-skeleton";

import { TukdoUsersCard } from "@/components/cards/tutor-learner-card"
import { tukdoUsers } from "@/config/tutor-learner"

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
		<Shell className="gap-12 pt-0 xs:pt-0 md:pt-0 lg:pt-0" /*className="max-w-6xl pt-0 md:pt-0"*/>
			<section
				id="hero"
				aria-labelledby="hero-heading"
				className="w-full h-[105vh] xs:h-[105vh] md:h-[70vh] bg-[#00528A] lg:h-[80vh] px-6 xs:px-6 lg:px-9 xl:px-9 flex flex-col gap-4 py-6 text-center"
				>
				<div className="grid grid-cols-1 gap-2 xs:gap-6 xl:gap-9 lg:gap-9 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        
					<div className="pl-0 xs:pl-0 md:pl-0 lg:pl-14 xl:pl-16 my-auto">
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
						<h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1] mb-4">
							<span className="text-[#FFFFFF]">
								An E-Learning <span className="text-[#F2602D] inline-block mt-1"> Community Platform</span>
							</span>				
						</h1>
						<Balancer className="max-w-[46rem] text-lg text-[#ffffff] sm:text-xl mb-6">
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
								Find Tutors
							</Link>
						</div>
					</div>
					<Image
						src="/hero2.png"
						alt=""
						width={600}
						height={420}
						className="rounded-md my-auto"
					/>
				</div>
			</section>
			<section
				id="categories"
				aria-labelledby="categories-heading"
				className="space-y-6 py-8 md:pt-10 lg:pt-24"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl text-[#F2602D]">
						Categories
					</h2>
					<Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Find curated content that suits your learning journey.
					</Balancer>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{courseCategories.map((category) => (
						<CourseCategoryCard key={category.title} category={category} />
					))}
				</div>
			</section>
			<section
				id="create-a-store-banner"
				aria-labelledby="create-a-store-banner-heading"
				className="space-y-6 py-8 xs:mx-0 sm:mx-14 md:mx-20 lg:mx-28 xl:mx-32 "

			>
			<div className="grid grid-cols-1 gap-6 xs:lg-gap-6 sm:lg-gap-12 md:lg-gap-24 xl:gap-32 sm:grid-cols-1 md:grid-cols-2">
				{tukdoUsers.map((users) => (
				<TukdoUsersCard key={users.title} users={users} />
				))}
			</div>
			</section>
			{/*
			<section
				id="become-a-tutor-banner"
				aria-labelledby="become-a-tutor-banner-heading"
				className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
			>
				<h2 className="text-2xl font-medium sm:text-3xl">
					Do you want to teach on our websivvvte?
				</h2>
				<Link href="/become-a-mentor">
					<div className={cn(buttonVariants())}>
						Be a mentor
						<span className="sr-only">Be a mentor</span>
					</div>
				</Link>	
			</section>
			
				<SponsorsSection/>
			*/}
			<section
				id="featured-courses"
				aria-labelledby="featured-courses-heading"
				className="space-y-6 pt-8 md:pt-10 lg:pt-12"
			>
				<div className="flex items-center justify-between gap-4">
					<div className="max-w-[58rem] flex-1 space-y-1">
						<h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl">
							<span className="text-[#F2602D]">Featured </span> <span className="text-[#00528A]">Courses</span>
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
					<div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
				id="featured-tutors"
				aria-labelledby="featured-tutors-heading"
				className="space-y-6 pt-8 md:pt-10 lg:pt-12"
			>
				<div className="flex items-center justify-between gap-4">
					<div className="max-w-[58rem] flex-1 space-y-1">
						<h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl">
							<span className="text-[#F2602D]">Featured </span> <span className="text-[#00528A]"> Tutors</span>
						</h2>
						<Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Explore tutors from around the world
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
						View all tutors
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all tutors</span>
					</Link>
				</div>
				<div className="space-y-8">
					<div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
						View all tutors
						<ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
						<span className="sr-only">View all tutors</span>
					</Link>
				</div>
			</section>
		</Shell>
	)
}