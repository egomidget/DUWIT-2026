import { useState, useEffect } from "react";
import StudySpace from "./StudySpace";

export default function StudySpaces() {
    const [spaces, setSpaces] = useState([]);

    // Example fetch call in your StudySpaces component
    useEffect(() => {
        fetch('http://localhost:8000/api/dumby-endpoint/')
            .then(res => res.json())
            .then(data => setSpaces(data));
    }, []);

    return(
        <div className="row g-4">
            {spaces.map((space) => (
                <div className="col-md-6 col-lg-4" key={space.id}>
                    <StudySpace {...space} />
                </div>
            ))}
        </div>
    )
}