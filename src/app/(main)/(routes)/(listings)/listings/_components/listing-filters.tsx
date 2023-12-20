"use client";

import * as React from "react"
import qs from "query-string";

import { usePathname, useRouter } from "next/navigation"

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

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";

interface ListingFilterProps {
	searchParams: {
        title?: string;
        listingCategoryId?: string;
		price_range?: string;
        mode?: string;
    };
}

const ListingFilters = ({
	searchParams,
}: ListingFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = React.useTransition();

    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 9000]);
    const debouncedPrice = useDebounce(priceRange, 200);

    const [mode, setMode] = React.useState<string>("");

    const filterChanged = React.useMemo(() => {
        return (
            searchParams.listingCategoryId || searchParams.price_range || searchParams.mode
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
                    listingCategoryId: searchParams.listingCategoryId || null,
                    //price_range: `${min}-${max}` || null,
                    price_range: min !== 0 || max !== 9000 ? `${min}-${max}` : null,
                    mode: mode || null,
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
                            max={9000}
                            className="h-9"
                            value={priceRange[1]}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setPriceRange([priceRange[0], value])
                            }}
                        />
                    
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-medium tracking-wide text-foreground">
                        Mode
                    </h3>
                    <RadioGroup 
                        defaultValue={searchParams.mode}
                        onValueChange={(value) => setMode(value)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Virtual/In-Person" id="Virtual/In-Person" />
                            <Label htmlFor="Virtual/In-Person">Virtual/In-person</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Virtual" id="Virtual" />
                            <Label htmlFor="Virtual">Virtual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="In-person" id="In-person" />
                            <Label htmlFor="In-person">In-person</Label>
                        </div>
                    </RadioGroup>
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
 
export default ListingFilters;