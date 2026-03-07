import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
const candyPinUrl = new URL('../images/lolly_pin.png', import.meta.url).href;

const candyIcon = new L.Icon({
    iconUrl: candyPinUrl,
    iconSize: [35, 35],
    popupAnchor: [0, -15],
});

export default function SpacesMap({ spaces, center }) {
    const defaultCenter = [51.505, -0.09]; 

    

    if (!spaces) {
        return <div className="sugar-font text-center mt-5">Loading the sweet treats map...</div>;
    }

    return (
        <div className="map-container card-candy shadow">
            <MapContainer 
                center={center ? center : defaultCenter} 
                zoom={13} 
                style={{ height: "400px", width: "100%", borderRadius: "20px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {spaces.map((space) => (
                    <Marker 
                        key={space.id} 
                        position={[space.lat, space.lng]} 
                        icon={candyIcon}
                    >
                        <Popup>
                            <div className="text-center">
                                <strong className="sugar-font" style={{color: 'var(--strawberry-pink)'}}>
                                    {space.name}
                                </strong>
                                <p className="small mb-1">{space.address}</p>
                                <a href={`/space/${space.id}`} className="btn btn-sm btn-sugar py-0">Race Here!</a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}