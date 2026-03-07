import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import StudySpace from "../components/StudySpace";
import Facilities from "../components/Facilities";
import SpacesMap from '../components/SpacesMap';
import CandyDivider from '../components/CandyDivider';

export default function StudySpaceDetail(){
    const { id } = useParams();
    const [space, setSpace] = useState({});
    const [sweetLocations, setSweetLocations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/dumby-endpoint-space/${id}/`)
            .then((res) => res.json())
            .then((data) => setSpace(data))
            .catch((err) => console.error("Glitch in the system!", err));
    }, [id]);

    useEffect(() => {
        if (space.lat && space.long) {
            fetch(`http://localhost:8000/api/map/treats/?lat=${space.lat}&lng=${space.long}`)
                .then((res) => res.json())
                .then((data) => setSweetLocations(data))
                .catch((err) => console.error("Glitch in the system!", err));
        }
    }, [space.lat, space.long]);

    console.log(sweetLocations);
    

    if (!space) {
        return <div className="sugar-font text-center mt-5">Loading the Starting Grid...</div>;
    }

    

    return (
        <>
            <StudySpace {...space}/>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='row'>
                        <div className='col-md-6 justify-content-center py-4'>
                            <Facilities items={space.facilities} />
                        </div>
                    </div>

                    <CandyDivider />
                    <div className='row p-5'>
                        <div className='col'>
                            <SpacesMap spaces={sweetLocations.treats} center={[space.lat, space.long]} />
                        </div>
                    </div>
                </div>
            </div>
            
            
        </>
    )
}