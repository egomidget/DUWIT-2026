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

export default function LocationPicker({ onLocationSelect }) {
    const [position, setPosition] = useState([54.775256272912785, -1.5847228185439737]);

    const handleSetPos = (newPos) => {
        setPosition(newPos);
        onLocationSelect(newPos[0], newPos[1]);
    };

    return (
        <div className="card-candy p-2 mb-3">
            <p className="sugar-font small text-center mb-1">Click the Map to Drop your Pin! 📍</p>
            <MapContainer center={position} zoom={13} style={{ height: '300px', borderRadius: '15px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler setPos={handleSetPos} />
                <Marker position={position} icon={candyIcon} />
            </MapContainer>
        </div>
    );
}