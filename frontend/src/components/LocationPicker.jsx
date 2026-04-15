import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
const candyPinUrl = new URL('../images/lolly_pin.png', import.meta.url).href;

const candyIcon = new L.Icon({
    iconUrl: candyPinUrl,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

function ClickHandler({ setPos }) {
    useMapEvents({
        click(e) {
            setPos([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

// LocationPicker.jsx
export default function LocationPicker({ onLocationSelect, results = [] }) {
    const [position, setPosition] = useState([54.7753, -1.5847]); // Your Durham default

    const handleSetPos = (newPos) => {
        setPosition(newPos);
        // This triggers the fetch in your parent Search component
        onLocationSelect(newPos[0], newPos[1]); 
    };

    return (
        <div className="card-candy p-2 mb-3">
            <p className="sugar-font small text-center mb-1">Click to Search this Area! 🍭</p>
            <MapContainer center={position} zoom={14} style={{ height: '400px', borderRadius: '15px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler setPos={handleSetPos} />
                
                {/* 1. The "Search Head" - where the user clicked */}
                <Marker position={position} icon={candyIcon} />

                {/* 2. The "Result Pins" - markers for found spots */}
                {results.map(spot => (
                    <Marker 
                        key={spot.id} 
                        position={[spot.latitude, spot.longitude]}
                        icon={candyIcon}

                    >
                        {/* <Popup>
                            <div className="text-center">
                                <strong>{spot.name}</strong><br/>
                                <a href={`/space/${spot.id}`} className="btn btn-sm btn-sugar py-0">Race!</a>
                            </div>
                        </Popup> */}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}