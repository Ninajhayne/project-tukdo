import { LatLngExpression } from "leaflet";
import { useMapEvents } from "react-leaflet";

import { Button } from "@/components/ui/button";

  
import { Radar } from "lucide-react";

interface FlyToMarkerControlProps {
    markerPosition: LatLngExpression;
    onLocateMarker?: () => void;
}

const FlyToMarkerControl = ({ 
    onLocateMarker, 
}: FlyToMarkerControlProps) => {
	const map = useMapEvents({
		locationfound: (event) => {
			const { latlng, accuracy } = event;
			//const radius = accuracy;
			//const circle = L.circle(latlng, radius);
			//circle.addTo(map);
			map.flyTo(latlng, 12);
		}
	});

	const handleLocateClick = () => {
		if (onLocateMarker) {
            onLocateMarker();
        }
	};
	return (
		
		<div
			style={{ position: "absolute", bottom: "20px", left: "10px", zIndex: 1000 }}
		>
			<Button onClick={handleLocateClick} variant="plaza_button">
				<Radar size={24}/>
			</Button>
		</div>
	);
};

export default FlyToMarkerControl;