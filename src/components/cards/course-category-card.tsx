import * as React from "react"
import { unstable_noStore as noStore } from "next/cache"

import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"

import type { Category } from "@/types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryCardProps {
	category: Category
}

export async function CourseCategoryCard({ category }: CategoryCardProps) {
	noStore()

	const courseCount = await db.course.count({
		where: {
			categoryId: category.id,
		},
	});

	return (
		
		<Link key={category.title} href={`/courses/?categoryId=${category.id}`}>
			<span className="sr-only">{category.title}</span>
			<Card className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted/50">
			<CardHeader>
				<div className="grid h-11 w-11 place-items-center rounded-full border-2">
					<category.icon className="h-5 w-5" aria-hidden="true" />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-1.5">
				<CardTitle className="capitalize">{category.title}</CardTitle>
				<React.Suspense fallback={<Skeleton className="h-4 w-20" />}>
					<CardDescription>
						{courseCount} {courseCount === 1 ? "course" : "courses"}
					</CardDescription>
				</React.Suspense>
			</CardContent>
			</Card>
		</Link>
	)
}
/*
<Link key={category.title} href={`/courses/?categoryId=${category.id}`}>
	<Card className="group relative overflow-hidden rounded-md bg-transparent">
		<div className="absolute inset-0 z-10 bg-zinc-950/75" />
		<Image
			src={category.image}
			alt={`${category.title} category`}
			className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
			sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
			fill
			loading="lazy"
		/>
		<CardHeader className="relative z-20">
			<div
				className={cn(
					buttonVariants({
						size: "icon",
						className:
						"pointer-events-none h-8 w-8 rounded-full bg-zinc-100 text-zinc-950",
					})
				)}
				aria-hidden="true"
			>
				<category.icon className="h-4 w-4" />
			</div>
		</CardHeader>
		<CardContent className="relative z-20">
			<CardTitle className="text-xl capitalize text-zinc-200">
				{category.title}
			</CardTitle>
			<React.Suspense fallback={<Skeleton className="h-4 w-20" />}>
				<CardDescription>
					{courseCount} {courseCount === 1 ? "course" : "courses"}
				</CardDescription>
			</React.Suspense>
		</CardContent>
	</Card>
	<span className="sr-only">{category.title}</span>
</Link>
*/