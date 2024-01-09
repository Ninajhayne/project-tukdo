import Image from "next/image";
import Link from "next/link";

//import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { JsonValue } from "@prisma/client/runtime/library";
import { Badge } from "@/components/ui/badge";

import { Dot } from "lucide-react";

interface ListingCardProps {
    id: string;
    name: string;
    imageUrl: string;
    fee: number | 0;
    email: string;
    description: string;
    location: JsonValue;
    videoUrl: string | null;
    mode: string | null;
    category: string | undefined;
    rating: number;
    numOfRatings: number;
}

export const ListingCard = ({
    id,
    name,
    imageUrl,
    fee,
    email,
    description,
    location,
    mode,
    category,
    rating,
    numOfRatings,
}:ListingCardProps) => {
    return (
        <Link href={`/listing/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
                
                <div className="flex items-center gap-4">
                    <Image
                        alt="Tutor"
                        src={imageUrl}
                        width={50}
                        height={50}
                        className="h-16 w-16 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-lg font-medium">
                            {name}
                        </h3>
                        <p className="text-xs truncate">
                            {email}
                        </p>
                            <Badge className="rounded-none bg-[#00528a] hover:bg-[#003c8a]">
                            {mode}
                        </Badge>
                        
                    </div>
                </div>

                <div className="mt-4">
                    {/*
                    <p className="mt-1">
                        {description}
                    </p>
                    <p className="text-xs">
                        {category}
                    </p>
                    */}

                    <p className="ml-0.5 text-lg font-bold text-[#F2602D]">
                        {fee === 0 ? "Free" : `${formatPrice(fee)} / hour`}
                    </p>
                    {numOfRatings && rating !== 0 ? (
                        <div className="flex flex-row items-center">
                            <p>
                                <span className="text-[#FFE600]">★</span> {rating.toFixed(2)}
                            </p>
                            <Dot className="w-4 h-4 mt-1"/>
                            {/*
                                <Button variant="link" size="sm" className="underline p-0 text-xs text-slate-500">
                                    {listing.numOfRatings} reviews
                                </Button>
                            */}
                            
                            <p className="text-xs text-muted-foreground">
                                {!numOfRatings ? '' :
                                numOfRatings === 1 ? `${numOfRatings} review` :
                                `${numOfRatings} reviews`}
                            </p>
                        </div>
                    ): null}
                    
                </div>
            </div>
        </Link>
    );
};

/*
<div className="relative w-full aspect-video rounded-md overflow-hidden">
    <Image
        fill
        className="object-cover"
        alt={name}
        src={imageUrl}
    />
</div>
<div className="flex flex-col pt-2">
    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
        {name}
    </div>
    <p className="text-xs text-muted-foreground">{category}</p>
    <p className="text-md md:text-sm font-medium text-slate-700">
        {fee === 0 ? "Free" : `${formatPrice(fee)}`}
    </p>
</div>
*/