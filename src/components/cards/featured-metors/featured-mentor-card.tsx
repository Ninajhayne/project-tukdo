"use client"

import { useState } from 'react';

import Link from "next/link"
import { Listing } from "@prisma/client"

import { cn } from "@/lib/utils"

import { AspectRatio } from "@/components/ui/aspect-ratio"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"

interface FeaturedMentorCardProps {
    featuredMentor: Listing & {
		mentor: {
			imageUrl: string,
			name: string,
		}
	};
  	href: string;
}

export function FeaturedMentorCard({ featuredMentor, href }: FeaturedMentorCardProps) {

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Link href={href}>
			<span className="sr-only">{featuredMentor.mentor.name}</span>
			<Card
				className="h-full overflow-hidden hover:bg-muted/50"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<AspectRatio ratio={16 / 9}>
					<div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
					<div className="h-full rounded-t-md border-b overflow-hidden">
						<video
							className="object-cover w-full h-full"
							loop
							muted
							playsInline
							onMouseOver={(event) => (event.target as HTMLVideoElement).play()}
							onMouseOut={(event) => (event.target as HTMLVideoElement).pause()}
						>
							<source src={featuredMentor.videoUrl!} type="video/mp4" />
						</video>
					</div>
					<div className={`absolute -bottom-4 right-0 mr-2 transition-transform duration-300 transform-gpu ${isHovered ? 'scale-75' : ''}`}>
					<Avatar>
						<AvatarImage src={featuredMentor.mentor.imageUrl} />
						<AvatarFallback></AvatarFallback>
					</Avatar>
					</div>
				</AspectRatio>
				<CardHeader className="space-y-2">
					<CardTitle className="line-clamp-1">{featuredMentor.mentor.name}</CardTitle>
					<CardDescription className="line-clamp-1">
					{featuredMentor.description?.length
						? featuredMentor.description
						: `Visit ${featuredMentor.mentor.name}`}
					</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	)
}

/*
<Link href={href}>
	<span className="sr-only">{featuredMentor.mentor.name}</span>
	<Card 
		className="h-full overflow-hidden transition-colors hover:bg-muted/50"
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
	>
		<AspectRatio ratio={16 / 9}>
			<div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
			<div
				className="h-full rounded-t-md border-b"
			>
				<video 
					className="object-cover w-full h-full"
					loop
					muted
					playsInline
					onMouseOver={(event) => (event.target as HTMLVideoElement).play()}
					onMouseOut={(event) => (event.target as HTMLVideoElement).pause()}
				>
					<source src={featuredMentor.videoUrl!} type="video/mp4" />
				</video>
			</div>
			<div
				className="absolute -bottom-4 right-0 mr-2"
			>
				<Avatar>
					<AvatarImage src={featuredMentor.mentor.imageUrl} />
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</div>
		</AspectRatio>
		<CardHeader className="space-y-2">
		<CardTitle className="line-clamp-1">{featuredMentor.mentor.name}</CardTitle>
		<CardDescription className="line-clamp-1">
			{featuredMentor.description?.length
			? featuredMentor.description
			: `Visit ${featuredMentor.mentor.name}`}
		</CardDescription>
		</CardHeader>
	</Card>
</Link>
*/
