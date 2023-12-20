
import { LatLng } from "leaflet";
import { useState } from "react";
import { useMapEvents, Circle } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Navigation, Radar } from "lucide-react";

const LocateMeControl = () => {

	const [radius, setRadius] = useState(1000); // Initial radius in meters (1 km)
	const [location, setLocation] = useState<LatLng | null>(null); 
	const [showCircle, setShowCircle] = useState(false);

	const map = useMapEvents({
		locationfound: (event) => {
			const { latlng, accuracy } = event;
			setLocation(latlng);
			//const radius = accuracy;
			//const circle = L.circle(latlng, radius);
			//const circle = <Circle center={latlng} radius={radius} fillColor="#0073e6" fillOpacity={0.2} />;
			//circle.addTo(map);
			map.flyTo(latlng, 12);
		}
	});

	const handleLocateClick = () => {
		map.locate({ setView: true });
		//setShowCircle(true);
	};

	const handleRadiusChange = (newRadius: any) => {
		setRadius(newRadius);
		if (newRadius === 0) {
			setShowCircle(false); // Hide the circle when the radius is cleared
		} else {
			setShowCircle(true);
		}
	};
	
	return (
		<>
			
			<div
				//className="leaflet-bar leaflet-control"
				data-tip="Locate Me"
				style={{ position: "absolute", bottom: "20px", left: "10px", zIndex: 1000 }}
			>
				<Button onClick={handleLocateClick} variant="plaza_button">
					<Navigation size={24}/>
				</Button>
			</div>
			<div
				className="gap-x-2 flex flex-row text-black"
				style={{ position: "absolute", top: "20px", right: "10px", zIndex: 1000 }}
			>
				<button onClick={() => handleRadiusChange(0)}>clear</button>
				<button onClick={() => handleRadiusChange(1000)}>1 km</button>
				<button onClick={() => handleRadiusChange(5000)}>5 km</button>
				<button onClick={() => handleRadiusChange(10000)}>10 km</button>
			</div>
			{showCircle && location && (
				<>
					<Circle
						center={location} // Center coordinates, adjust as needed
						radius={radius}
						fillColor="#0073e6" // Color of the circle
						fillOpacity={0.2} // Opacity of the fill color
						eventHandlers={{ click: handleRadiusChange }} // Handle radius change on click
					/>
				</>
			)}
			
		</>
		
	  
	);
};

export default LocateMeControl;