import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import StudySpace from "../components/StudySpace";
import Facilities from "../components/Facilities";
import SpacesMap from '../components/SpacesMap';
import CandyDivider from '../components/CandyDivider';

export default function StudySpaceDetail() {
    const { id } = useParams();
    const [space, setSpace] = useState(null);
    const [sweetLocations, setSweetLocations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/studyspaces/${id}/`)
            .then((res) => res.json())
            .then((data) => setSpace(data))
            .catch((err) => console.error("Glitch in the system!", err));
    }, [id]);

    useEffect(() => {
        const lat = space?.location?.latitude;
        const lng = space?.location?.longitude;

        if (lat && lng) {
            fetch(`http://localhost:8000/api/map/treats/?lat=${lat}&lng=${lng}`)
                .then((res) => res.json())
                .then((data) => setSweetLocations(data))
                .catch((err) => console.error("Treat fetch failed!", err));
        }
    }, [space]);

    if (!space || !space.location) {
        return <div className="sugar-font text-center mt-5">Warming up the engines...</div>;
    }

    const facilityKeys = [
        "indoors", "wifi", "plugsockets", "in_house_food", 
        "pay_to_enter", "public", "accessibility"
    ];

    const activeFacilities = facilityKeys.filter(key => space[key] === true);

    return (
        <>
            <StudySpace {...space}/>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='row'>
                        <div className='col-md-6 justify-content-center py-4'>
                            <Facilities items={activeFacilities} />
                        </div>
                    </div>

                    <CandyDivider />
                    
                    <div className='row p-5'>
                        <div className='col'>
                            <SpacesMap 
                                spaces={sweetLocations.treats || []} 
                                center={[space.location.latitude, space.location.longitude]} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}