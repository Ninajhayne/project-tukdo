import Image from "next/image"
import Link from "next/link"
import React from 'react';
import type { Users } from "@/types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,   
} from "@/components/ui/card"


interface UsersCardProps {
  users: Users;    
}

export function TukdoUsersCard({ users }: UsersCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-md">
        <div className="absolute inset-0 z-10 bg-zinc-950/50" />
			<Image
				src={users.image}
				alt={`${users.title} users`}
				className="object-cover"
				sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
				fill
				loading="lazy"
			/>
      <CardContent className="relative py-10 z-20 text-center items-center place-items-center">
        <CardTitle className="text-3xl mt-2 mb-6 text-[#FFFFFF] tracking-normal">
            {users.title}
        </CardTitle>
        <CardDescription className="text-base font-medium"> 
            <Link 
                href={users.href}
                className={cn(
                    buttonVariants({
                        variant: "outline",
                        size: "lg",
                    }),
                    "bg-transparent text-[#FFFFFF]"
                )}>
                    {users.buttonTitle}
            </Link>

        </CardDescription>
      </CardContent>
    </Card>
  );
}
