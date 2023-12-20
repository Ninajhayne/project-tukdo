"use client";

import * as React from "react"
import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDebounce } from "@/hooks/use-debounce";

import {
    Sheet,
    SheetClose,
    SheetContent,
    //SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";

interface CourseFilterProps {
	searchParams: {
        title?: string;
        categoryId?: string;
		price_range?: string;
    };
}

const CourseFilters = ({
	searchParams,
}: CourseFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = React.useTransition();

    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 9000]);
    const debouncedPrice = useDebounce(priceRange, 200);

    const filterChanged = React.useMemo(() => {
        return (
            searchParams.categoryId || searchParams.price_range
        );
    }, [searchParams, priceRange]);

    const handleClearFiltersClick = () => {
        setPriceRange([0, 9000]);
        // Add more logic for other filters if needed
        router.replace(pathname || "", undefined);
    };

    const handleShowButtonClick = () => {
        const [min, max] = debouncedPrice;
        startTransition(() => {
            const url = qs.stringifyUrl({
                url: pathname || "",
                query: {
                    categoryId: searchParams.categoryId || null,
                    price_range: `${min}-${max}` || null,
                }
            }, { skipNull: true, skipEmptyString: true });

            router.push(url);
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    aria-label="Filter products"
                    size="sm"
                    className="flex items-center relative"
                >
                    {filterChanged && (
                        <Badge
                            variant="secondary"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
                        >
                            {/* Add logic to show the number of filters */}
                            {Object.values(searchParams).filter(Boolean).length}
                        </Badge>
                    )}
                    <MixerHorizontalIcon className="h-4 w-4" />
                    <span className="hidden md:inline md:ml-2">Filters</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="px-1">
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-sm font-medium tracking-wide text-foreground">
                        Price range ($)
                    </h3>
                    <Slider
                        variant="range"
                        thickness="thin"
                        defaultValue={[0, 9000]}
                        max={9000}
                        step={1}
                        value={priceRange}
                        onValueChange={(value: typeof priceRange) =>
                            setPriceRange(value)
                        }
                    />
                    <div className="flex items-center space-x-4">
                        <Input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={priceRange[1]}
                            className="h-9"
                            value={priceRange[0]}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setPriceRange([value, priceRange[1]])
                            }}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                            type="number"
                            inputMode="numeric"
                            min={priceRange[0]}
                            max={500}
                            className="h-9"
                            value={priceRange[1]}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setPriceRange([priceRange[0], value])
                            }}
                        />
                    
                    </div>
                </div>
                <div className="flex space-x-2 justify-between">
                    <SheetClose>
                            <Button
                                aria-label="Clear filters"
                                size="sm"
                                className="w-full"
                                variant="ghost"
                                onClick={handleClearFiltersClick}
                            >
                                {`Clear (${Object.values(searchParams).filter(Boolean).length})`}
                            </Button>
                    </SheetClose>
                    <SheetClose>
                        <Button
                            aria-label="Show courses"
                            size="sm"
                            className="w-full"
                            onClick={handleShowButtonClick}
                            disabled={isPending}
                        >
                            Show
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default CourseFilters;

//Filter

{/*
<Button aria-label="Filter products" size="sm" className="relative">
    <Badge
    variant="secondary"
    className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 h-6 w-6 rounded-full p-2"
    >
    0
    </Badge>
    <MixerHorizontalIcon className="mr-2 h-4 w-4" /> Filters
</Button>
*/}
{/*
    
*/}
/*
import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce";

import { cn, toTitleCase, truncate } from "@/lib/utils"
import type { Option } from "@/types"

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { MultiSelect } from "@/components/multi-select"
*/

/*
const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()


const [isPending, startTransition] = React.useTransition()

// Search params
const page = searchParams?.get("page") ?? "1"
const per_page = searchParams?.get("per_page") ?? "8"
const sort = searchParams?.get("sort") ?? "createdAt.desc"
const store_ids = searchParams?.get("store_ids")
const store_page = searchParams?.get("store_page") ?? "1"

// Create query string
const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    for (const [key, value] of Object.entries(params)) {
        if (value === null) {
            newSearchParams.delete(key)
        } else {
            newSearchParams.set(key, String(value))
        }
    }

    return newSearchParams.toString()
    },
    [searchParams]
)

// Price filter
const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 9999])
const debouncedPrice = useDebounce(priceRange, 9999)

React.useEffect(() => {
    const [min, max] = debouncedPrice
    startTransition(() => {
    router.push(
        `${pathname}?${createQueryString({
        price_range: `${min}-${max}`,
        })}`,
        {
        scroll: false,
        }
    )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedPrice])

// Category filter
const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
>(null)

React.useEffect(() => {
    startTransition(() => {
    router.push(
        `${pathname}?${createQueryString({
        categoryId: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
            selectedCategories.map((c) => c.value).join(".")
            : null,
        })}`,
        {
        scroll: false,
        }
    )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedCategories])

function removePriceRange(searchParams: URLSearchParams) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('price_range');
    return newSearchParams;
}
*/

/*
<Sheet>
    <SheetTrigger asChild>
        <Button aria-label="Filter products" size="sm" disabled={isPending}>
            Filter
        </Button>
    </SheetTrigger>
    <SheetContent className="flex flex-col">
        <SheetHeader className="px-1">
            <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
        <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wide text-foreground">
                Price range ($)
            </h3>
            <Slider
                variant="range"
                thickness="thin"
                defaultValue={[0, 9999]}
                max={9999}
                step={1}
                value={priceRange}
                onValueChange={(value: typeof priceRange) =>
                    setPriceRange(value)
                }
            />
            <div className="flex items-center space-x-4">
            <Input
                type="number"
                inputMode="numeric"
                min={0}
                max={priceRange[1]}
                className="h-9"
                value={priceRange[0]}
                onChange={(e) => {
                const value = Number(e.target.value)
                    setPriceRange([value, priceRange[1]])
                }}
            />
            <span className="text-muted-foreground">-</span>
            <Input
                type="number"
                inputMode="numeric"
                min={priceRange[0]}
                max={9999}
                className="h-9"
                value={priceRange[1]}
                onChange={(e) => {
                const value = Number(e.target.value)
                setPriceRange([priceRange[0], value])
                }}
            />
            </div>
        </div>
        
        {items?.length ? (
            <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wide text-foreground">
                Categories
            </h3>
            <MultiSelect
                placeholder="Select categories"
                selected={selectedCategories}
                setSelected={setSelectedCategories}
                options={items.map((c) => ({
                    label: toTitleCase(c.name),
                    value: c.id, 
                }))}
            />
            </div>
        ) : null}
        </div>
        <div>
        <Separator className="my-4" />
        <SheetFooter>
            <Button
                aria-label="Clear filters"
                size="sm"
                className="w-full"
                onClick={() => {
                    startTransition(() => {
                        router.push("/courses");
                        setPriceRange([0, 9999])
                        setSelectedCategories(null)
                    })
                }}
                disabled={isPending}
            >
                Clear Filters
            </Button>
        </SheetFooter>
        </div>
    </SheetContent>
</Sheet>
*/