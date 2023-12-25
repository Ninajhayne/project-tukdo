import Image from "next/image"
import Link from "next/link"
import React from 'react';
import type { Members } from "@/types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,   
} from "@/components/ui/card"


interface MemberCardProps {
  members: Members;    
}

export function TeamMemberCard({ members }: MemberCardProps) {
  return (
    <Card className="group relative overflow-hidden border-none shadow-transparent">
        <CardHeader className="relative z-20 items-center px-0 xs:px-0 sm:px-3 md:px-6 lg:px-8 xl:px-10">
                <Image
                    src={members.image}
                    alt={`${members.name} users`}
                    className="rounded-full h-40"
                    style={{position: "relative", width: "100%", height: "100%" }}
                    width={40}
                    height={40}
                    loading="lazy"
                
                />
        </CardHeader>
      <CardContent className="relative p-4 z-20 text-center items-center place-items-center">
        <CardTitle className="text-lg font-bold mb-3">
            {members.name}
        </CardTitle>
        <CardDescription className="text-base text-foreground">{
          members.role}
        </CardDescription>
        <div className="mt-4">
            <Link 
                href={members.email}
                className={cn(
                    buttonVariants({
                        variant: "outline",
                        size: "lg",
                    }),
                    "bg-transparent text-[#F2602D]"
                )}>
                    Contact
            </Link>
          </div>
      </CardContent>
    </Card>
  );
}
