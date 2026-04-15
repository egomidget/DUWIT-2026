import { useState } from 'react';
import StudySpace from './StudySpace';
import LocationPicker from './LocationPicker';

import Card from './Card';

// export default function SearchSpaces() {
//     const [filteredSpots, setFilteredSpots] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // This function hits your Django filtered endpoint
//     const handleSearch = (lat, lng) => {
//         setLoading(true);
//         fetch(`http://localhost:8000/api/map/studyspaces/nearby/?lat=${lat}&lng=${lng}`)
//             .then(res => res.json())
//             .then(data => {
//                 setFilteredSpots(data.study_spots || []);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Engine failure!", err);
//                 setLoading(false);
//             });
//     };

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 {/* Left Side: The Map Control */}
//                 <div className="col-lg-7 mb-4">
//                     <div className="card-candy p-3">
//                         <h3 className="sugar-font text-pink mb-3">Scan the Map</h3>
//                         <SpacesMap 
//                             onMapClick={handleSearch} 
//                             spaces={filteredSpots} 
//                         />
//                         <p className="small text-muted mt-2 text-center">
//                             Click anywhere on the map to find nearby sugar-fueled spots!
//                         </p>
//                     </div>
//                 </div>

//                 {/* Right Side: The Filtered Results */}
//                 <div className="col-lg-5">
//                     <h2 className="sugar-font mb-4">Nearby Treats</h2>
//                     {loading ? (
//                         <div className="sugar-font">Revving engines...</div>
//                     ) : filteredSpots.length > 0 ? (
//                         <div className="results-scroll" style={{maxHeight: '600px', overflowY: 'auto'}}>
//                             {filteredSpots.map(spot => (
//                                 <StudySpace key={spot.id} {...spot} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="alert alert-info border-dashed">
//                             No tracks found in this sector. Try another spot!
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function SearchPage() {
    const [spots, setSpots] = useState([]);

    const fetchNearby = (lat, lng) => {
        fetch(`http://localhost:8000/api/map/study-spots/nearby/?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(data => setSpots(data.study_spots))
            .catch(err => console.error("Engine failure!", err));
    };

    return (
        <div className="row">
            <div className="col-md-8">
                {/* We pass 'spots' back in so the map can draw markers for them */}
                <LocationPicker onLocationSelect={fetchNearby} results={spots} />
            </div>
            <div className="col-md-4">
                <h3 className="sugar-font">Results</h3>
                {spots.map(spot => (
                    // <div key={spot.id} className="card-candy mb-2 p-2">
                    //     {spot.name}
                    // </div>
                    // <StudySpace {...spot} />
                    <Card header={spot.name}>
                        <a href={`/spaces/${spot.id}`}>Link here!</a>
                    </Card>
                ))}
            </div>
        </div>
    );
}