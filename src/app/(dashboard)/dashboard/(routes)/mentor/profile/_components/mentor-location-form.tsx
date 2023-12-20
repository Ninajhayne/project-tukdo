"use client";

import * as React from "react"
import axios from "axios";
import { cn } from "@/lib/utils"
import { toast } from "sonner";

/*
import dynamic from "next/dynamic";
const LocationSelect = dynamic(() => import('@/components/location/my-location-select'), {
    ssr: false, // Disable server-side rendering for this component
});
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

//import L, { LatLngExpression } from "leaflet";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const defaultPosition = [13.142677603900692, 123.72406519886917];

const customMarker = new (L.icon as any)({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

/*
interface LocationSelectProps {
    location: LatLngExpression;
}
*/

import { Listing } from "@prisma/client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

import { Skeleton } from "@/components/ui/skeleton"

import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface MentorLocationFormProps {
    initialData: Listing;
    listingId: string;
};

interface Place {
    place_id: number;
    name: string;
    display_name: string;
    lat: number;
    lon: number;
    // Add other properties as needed
}

const MentorLocationForm = ({ 
    initialData,
    listingId,
}: MentorLocationFormProps) => {
    const mapRef = React.useRef(null);
    const [open, setOpen] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState<Place[]>([]);

    const debouncedQuery = useDebounce(searchText, 1000)
    const [isPending, startTransition] = React.useTransition()

    const router = useRouter();

    const MapWrapper = () => {
		const map = useMap();

		// Set the map instance to the ref when it is ready
		useEffect(() => {
            //@ts-ignore
		    mapRef.current = map;
		}, [map]);

		return null; // Render nothing within the MapContainer
	};
    /*
    React.useEffect(() => {
        if (debouncedQuery.length <= 0) {
            setListPlace([]);
            return;
        }

        let mounted = true;

        function fetchData() {
            startTransition(async () => {
                try {
                    const params = {
                        q: debouncedQuery,
                        format: 'json',
                        addressdetails: '1', // Convert to string
                        polygon_geojson: '0', // Convert to string
                    };

                    const queryString = new URLSearchParams(params).toString();

                    const response = await fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
                        method: 'GET',
                        redirect: 'follow', // Set redirect directly here
                    });

                    if (!response.ok) {
                        throw new Error(`Fetch error: ${response.status}`);
                    }

                    const result = await response.text();

                    if (mounted) {
                        setListPlace(JSON.parse(result));
                    }
                } catch (err) {
                    console.error('Error:', err);
                }
            });
        }

        fetchData();

        return () => {
            mounted = false;
        };
    }, [debouncedQuery]);
    */
    React.useEffect(() => {
        if (debouncedQuery.length <= 0) {
            setListPlace([]);
            return;
        }
      
        let mounted = true;
      
        function fetchData() {
            startTransition(async () => {
                try {
                const params = {
                    q: debouncedQuery,
                    format: 'json',
                    addressdetails: '1',
                    polygon_geojson: '0',
                };
        
                const queryString = new URLSearchParams(params).toString();
        
                const response = await fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
                    method: 'GET',
                    redirect: 'follow',
                });
        
                if (!response.ok) {
                    throw new Error(`Fetch error: ${response.status}`);
                }
        
                const result = await response.text();
        
                if (mounted) {
                    setListPlace(JSON.parse(result));
                }
                } catch (err) {
                    console.error('Error:', err);
                }
            });
        }
      
        fetchData();
      
        return () => {
            mounted = false;
        };
    }, [debouncedQuery]);
      
    
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "l" && (e.metaKey || e.ctrlKey))
            {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelect = async (lat: number, lon: number) => {
        setOpen(false);
    
        try {
            await axios.patch(`/api/mentor/listings/${listingId}`, { location: { lat, lon } });
            if (mapRef.current) {
                //@ts-ignore
                mapRef.current.flyTo({ lat, lon }, 15);
            };
            toast.success("Profile Updated");
            router.refresh();
        } catch (error) {
            toast.error("Error updating profile");
            console.error("Error updating profile:", error);
            // Handle error case
        }
    };    

    const handleLocationClick = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        await axios.patch(`/api/mentor/listings/${listingId}`, {location:{lat: latitude, lon: longitude}});
                        if (mapRef.current) {
                            //@ts-ignore
                            mapRef.current.flyTo({lat: latitude, lon: longitude}, 15);
                        };
                        toast.success("Profile Updated");
                        router.refresh();
                    } catch (error) {
                        toast.error("Error updating profile");
                        console.error("Error updating profile:", error);
                        // Handle error case
                    }
                },
                (error) => {
                    toast.error("Error getting geolocation");
                    console.error("Error getting geolocation:", error);
                    // Handle error case
                }
            );
        } else {
            toast.error("Geolocation is not supported in this browser.");
            console.error("Geolocation is not supported in this browser.");
            // Handle case where geolocation is not supported
        }
    };

    React.useEffect(() => {
        if (!open) {
            setListPlace([])
            setSearchText("");
        }
    }, [open]);

    //console.log("Locations:", listPlace);

    return (
        <Card
            //as="section"
            id="mentor-location-form-container"
            aria-labelledby="mentor-location-form-heading"
        >
            <CardContent>
                <div className="flex mt-4 border">
                    <Button
                        onClick={handleLocationClick}
                        size="sm"
                        className="rounded-none"
                    >
                        <Navigation/>
                    </Button>
                    <button
                        className="group px-2 py-2 flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                        onClick={() => setOpen(true)}
                    >
                        <p
                            className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
                        >
                            Search
                        </p>
                        <kbd
                            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto" 
                        >
                            <span className="text-xs">⌘</span>L
                        </kbd>
                    </button>
                </div>
                
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput 
                        placeholder="Type your location..." 
                        value={searchText}
                        onValueChange={setSearchText}
                    />
                    <CommandList>
                        <CommandEmpty
                            className={cn(isPending && listPlace.length === 0 ? "hidden" : "py-6 text-center text-sm")}
                        >
                            Location not found.
                        </CommandEmpty>
                        {isPending && listPlace.length === 0 ? (
                                <div className="space-y-1 overflow-hidden px-1 py-2">
                                    <Skeleton className="h-8 rounded-sm" />
                                    <Skeleton className="h-8 rounded-sm" />
                                </div>
                        ) : (
                            listPlace.map((place) => (
                                <CommandItem 
                                    key={place.place_id}
                                    value={place.display_name}
                                    onSelect={() => handleSelect(place.lat, place.lon)}
                                >
                                    <span className="truncate">{place.display_name}</span>
                                </CommandItem>
                            ))
                        )}
                           
                    </CommandList>
                </CommandDialog>
                <div className="relative aspect-video mt-2">
                    <MapContainer
                        //@ts-ignore
                        center={initialData?.location || defaultPosition}
                        zoom={initialData?.location ? 15 : 5}
                        scrollWheelZoom={false}
                        className="h-[250px] w-full z-0"
                        dragging={false}
                        id="Location Form Map"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        {initialData?.location && (
                            //@ts-ignore
                            <Marker position={initialData?.location} icon={customMarker}/>
                        )}
                        <MapWrapper />
                    </MapContainer>
                    {initialData?.location && (
                        <Link
                            //@ts-ignore
                            href={`http://maps.google.com/?cbll=${initialData?.location.lat},${initialData?.location.lon}&cbp=12,20.09,,0,5&layer=c`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Badge variant="outline">
                                Google Street View
                            </Badge>
                        </Link>
                    )}
                    
                </div>
            </CardContent>
        </Card>
    );
};

export default MentorLocationForm;