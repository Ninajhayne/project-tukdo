"use client";

//import { useEffect, useState } from 'react';

import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { toast } from 'sonner';

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const defaultPosition = [13.142677603900692, 123.72406519886917];

const customMarker = new (L.icon as any)({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

interface LocationSelectProps {
    location: LatLngExpression;
}

const LocationSelect = ({
	location,
}: LocationSelectProps) => {
	/*
	const [position, setPosition] = useState<[number, number] | null>(null);
	

	const handleMapClick = (e: any) => {
		const { lat, lng } = e.latlng;
		setPosition([lat, lng]);
	};
	*/

	//console.log("My Location", location);

	return (
		<div className="relative aspect-video mt-2">
			<MapContainer
				center={location || defaultPosition}
				zoom={15}
				scrollWheelZoom={false}
				className="h-[250px] w-full z-0"
				//style={{ height: '400px', width: '100%', zIndex: 1 }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				/>
				{location && (
					<Marker position={location} icon={customMarker}/>
				)}
				
			</MapContainer>
			{location && (
				<Link
					//@ts-ignore
					href={`http://maps.google.com/?cbll=${location.lat},${location.lon}&cbp=12,20.09,,0,5&layer=c`}
					rel="noopener noreferrer"
					target="_blank"
				>
					<Badge variant="outline">
						Google Street View
					</Badge>
				</Link>
			)}
			
		</div>
	);
};
/*
<MapClickHandler setPosition={setPosition} />
const MapClickHandler: React.FC<{ setPosition: (position: [number, number] | null) => void }> = ({ setPosition }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
    },
  });

  return null;
};
*/
export default LocationSelect;
