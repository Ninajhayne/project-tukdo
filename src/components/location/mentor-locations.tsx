"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { Listing } from "@prisma/client";

import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

const getCustomMarkerIcon = (pictureUrl: string) => {
    return new L.Icon({
		iconUrl: pictureUrl,
		iconSize: [32, 32],
		iconAnchor: [10, 41],
		popupAnchor: [2, -40],
		className: "rounded-full trasform transition duration-500 ease-in-out hover:rounded-xl",
    });
};

type ListingWithProfile = Listing & {
	listing: Listing;
	listingCategory: {
        id: string;
        name: string;
    } | null;
    mentor: {
        imageUrl: string;
        name: string;
        email: string;
    };
};

interface MentorLocationsProps {
	listings: ListingWithProfile[];
}

import LocateMeControl from "./locate-me-control";

const MentorLocations = ({
    listings, 
}: MentorLocationsProps) => {
    const mapRef = useRef<L.Map | null>(null);

	var southWest = L.latLng(-89.98155760646617, -180),
	northEast = L.latLng(89.99346179538875, 180);
	var bounds = L.latLngBounds(southWest, northEast);

    const MapWrapper = () => {
        const map = useMap();

        // Set the map instance to the ref when it is ready
        useEffect(() => {
            mapRef.current = map;
			
        }, [map]);

        return null; // Render nothing within the MapContainer
    };
	
    /*
    const handleMapDragEnd = (event: any) => {
        //console.log(event.target.getCenter());
    };
  	*/
    //console.log("Listings from map =>", listings);
    //console.log("Mentor Locations=>", mentorLocations);

	//console.log("Listings Locations =>", listings.mentor.location);

    return (
		<div>
			<MapContainer
				center={[13.41, 122.56]} // Set the center to the Philippines coordinates
				zoom={5} // Adjust the zoom level as needed
				scrollWheelZoom={false}
				className="h-[85vh] z-0"
				maxBounds={bounds}
			>
				<LocateMeControl/>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					minZoom={1}
				/>

				{listings.map((listing) => (
					listing.mentor.imageUrl && (
						<Marker
							key={listing.id}
							position={listing.location as LatLngExpression}
							icon={getCustomMarkerIcon(listing.mentor.imageUrl)}
							riseOnHover
							//eventHandlers={{ dragend: handleMapDragEnd }}
						>
							<Popup>
								<span className="font-bold">{listing.mentor.name}</span>
								<div className="flex items-center">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-[#FFE600]"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Rating star</title>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<span className="text-sm font-bold">
										{listing.rating.toFixed(2)}
									</span>
								</div>
								<div className="mt-2">
									<Link
										//@ts-ignore
										href={`http://maps.google.com/?cbll=${listing?.location?.lat},${listing?.location?.lon}&cbp=12,20.09,,0,5&layer=c`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<button className="text-xs btn btn-xs btn-outline rounded-none">
											Google Street View
										</button>
									</Link>
								</div>
								<div className="mt-2">
									<Link href={`/listing/${listing.id}`}>
										<Button size="sm" variant="plaza_button" className="w-full">
											View
										</Button>
									</Link>
								</div>
							</Popup>
						</Marker>
					)
				))}
				<MapWrapper />
			</MapContainer>
		</div>
    );
};


export default MentorLocations;
  
