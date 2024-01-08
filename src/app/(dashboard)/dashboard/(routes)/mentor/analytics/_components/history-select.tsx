"use client";

import * as React from "react"

import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { timeframeOptions } from "@/config/reports-and-analytics/timeframe-options";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";

import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";



export const HistorySelect = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchParamMap = {
        last24Hours: "Last 24 Hours",
        yesterday: "Yesterday",
        thisWeek: "This Week",
        last7Days: "Last 7 Days",
        thisMonth: "This Month",
        last30Days: "Last 30 Days",
        last90Days: "Last 90 Days",
    } as Record<string, string>;

    const frame = searchParams?.get("history") ?? "last24Hours"
    const selectedFrameName = searchParamMap[frame] || "Last 24 Hours";
    /*
        const onClick = (value: string) => {
            const url = qs.stringifyUrl({
                url: pathname || "",
                query: {
                    history: value,
                }
            }, { skipNull: true, skipEmptyString: true });
            
            router.push(url);
        };
    */
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label="timeframe" size="sm" variant={"outline"}>
                    <CalendarIcon className="mr-2"/>
                    {selectedFrameName}
                    <CaretSortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Options:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {timeframeOptions.map((option) => (
                <DropdownMenuItem
                    key={option.label}
                    className={cn(option.value === frame && "bg-accent font-bold")}
                    onClick={() => {
                        const url = qs.stringifyUrl({
                            url: pathname || "",
                            query: {
                                history: option.value,
                            }
                        }, { skipNull: true, skipEmptyString: true });
                        
                        router.push(url);
                    }}
                >
                    {option.label}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/*

<Select defaultValue="last24Hours" >
    <SelectTrigger className="w-[180px] flex items-center">
        <CalendarIcon className="mr-1"/> <SelectValue placeholder="Last 24 Hours" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
            <SelectItem value="last24Hours">Last 24 Hours</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <Separator/>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <Separator/>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="last30Days">Last 30 days</SelectItem>
            <SelectItem value="last90Days">Last 90 days</SelectItem>
        </SelectGroup>
    </SelectContent>
</Select>
<DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-label="timeframe" size="sm" variant={"outline"}>
                        <CalendarIcon className="mr-1"/>
                        Last 24 Hours
                        <CaretSortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sortOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.label}
                        className={cn(option.value === sort && "bg-accent font-bold")}
                        onClick={() => {
                        startTransition(() => {
                            router.push(
                            `${pathname}?${createQueryString({
                                sort: option.value,
                            })}`,
                            {
                                scroll: false,
                            }
                            )
                        })
                        }}
                    >
                        {option.label}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
*/
