"use client";

import { useRef, useEffect, useState } from 'react';

import L, { LatLngExpression, Map } from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import FlyToMarkerControl from './fly-to-marker-control';

const defaultPosition = [13.142677603900692, 123.72406519886917];

const customMarker = new (L.icon as any)({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

interface MentorLocationProps {
    location: LatLngExpression;
}

const MentorLocation = ({
	location,
}: MentorLocationProps) => {
	const mapRef = useRef<Map | null>(null);
	const [markerPosition, setMarkerPosition] = useState(location);

	const MapWrapper = () => {
		const map = useMap();

		// Set the map instance to the ref when it is ready
		useEffect(() => {
			mapRef.current = map;
		}, [map]);

		return null; // Render nothing within the MapContainer
	};

	const handleFlyToMarker = () => {
		if (mapRef.current) {
			mapRef.current.flyTo(markerPosition, 15);
		};
	};
	
	return (
		<div className="relative aspect-video mt-2">
			<MapContainer
				center={location || defaultPosition}
				zoom={15}
				scrollWheelZoom={false}
				className="h-[350px] w-full z-0"
				//style={{ height: '400px', width: '100%', zIndex: 1 }}
			>
				<FlyToMarkerControl 
					markerPosition={markerPosition} 
					onLocateMarker={handleFlyToMarker}
				/>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				/>
				{location && (
					<Marker position={location} icon={customMarker}/>
				)}
				<MapWrapper />
			</MapContainer>
			{location && (
				<Link
					//@ts-ignore
					href={`http://maps.google.com/?cbll=${location.lat},${location.lon}&cbp=12,20.09,,0,5&layer=c`}
					rel="noopener noreferrer"
					target="_blank"
				>
					<Badge variant="outline" className="rounded-none">
						Google Street View
					</Badge>
				</Link>
			)}
			
		</div>
	);
};

export default MentorLocation;
