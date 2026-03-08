import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LocationPicker from '../components/LocationPicker';


export default function AddStudySpace() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [options, setOptions] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/studyspaces/options/')
            .then(res => res.json())
            .then(data => setOptions(data))
            .catch(err => console.error("Data sync glitch!", err));
    }, []);

    const handleLocationChange = (lat, lng) => {
        setValue('lat', lat);
        setValue('long', lng);
    };

    // const onSubmit = async (data) => {
    //     setIsSubmitting(true);
    //     try {
    //         const response = await fetch('http://localhost:8000/api/map/add-study-spot/', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data),
    //         });
    //         if (response.ok) alert("Race Track Created! 🍬");
    //     } catch (error) {
    //         console.error("Submission failed", error);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

        const onSubmit = async (data) => {
        const formattedData = {
            name: data.name,
            description: data.description,
            wifi: data.wifi,
            plugsockets: data.plugsockets,

            location: {
                name: data.name,
                latitude: parseFloat(data.lat), 
                longitude: parseFloat(data.long),
                address: data.address || "Unknown Location",
                location_type: 'study'
            }
        };

        try {
            const response = await fetch('http://localhost:8000/api/studyspaces/create/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert("Race Track Created! 🏁");
            } else {
                const errorData = await response.json();
                console.error("Backend validation glitch:", errorData);
            }
        } catch (err) {
            console.error("Connection error:", err);
        }
    };

    if (!options) return <div className="sugar-font text-center mt-5">Gathering Ingredients...</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="card card-candy shadow-lg">
                <div className="candy-stripe p-3">
                    <h2 className="sugar-font text-white mb-0">Register New Study Space</h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4">
                    {/* Basic Info */}
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <label className="sugar-font small">Space Name</label>
                            <input {...register("name", { required: true })} className="form-control input-glaze" placeholder="e.g. The Mentos Mountain" />
                        </div>
                        <div className="col-md-4">
                            <label className="sugar-font small">Rating (1-5)</label>
                            <select {...register("rating")} className="form-select input-glaze">
                                {options.rating.map(r => <option key={r} value={r}>{r} Stars</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Checkbox Grid (Booleans) */}
                    <div className="row mb-4 p-3 bg-light rounded-4 border-dashed">
                        <h6 className="sugar-font text-pink mb-3">Power-Ups (Facilities)</h6>
                        <div className="col-6 col-md-3">
                            <div className="form-check">
                                <input type="checkbox" {...register("wifi")} className="form-check-input" />
                                <label className="form-check-label">Free Wifi</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-check">
                                <input type="checkbox" {...register("plugsockets")} className="form-check-input" />
                                <label className="form-check-label">Plugs</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-check">
                                <input type="checkbox" {...register("indoors")} className="form-check-input" />
                                <label className="form-check-label">Indoors</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-check">
                                <input type="checkbox" {...register("accessibility")} className="form-check-input" />
                                <label className="form-check-label">Accessible</label>
                            </div>
                        </div>
                    </div>

                    {/* Dropdowns (Choices) */}
                    <div className="row mb-3">
                        <div className="col mb-3">
                            <label className="sugar-font small">Temperature</label>
                            <select {...register("temperature")} className="form-select input-glaze">
                                <option value="">Select Temp...</option>
                                {options.temperature.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="col mb-3">
                            <label className="sugar-font small">Sound Level</label>
                            <select {...register("sound")} className="form-select input-glaze">
                                <option value="">Select Noise...</option>
                                {options.sound.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="col mb-3">
                            <label className="sugar-font small">Windows</label>
                            <select {...register("windows")} className="form-select input-glaze">
                                <option value="">Select Windows...</option>
                                {options.windows.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="sugar-font small">Description</label>
                        <textarea {...register("description")} className="form-control input-glaze" rows="3" placeholder="Tell us about the vibes..."></textarea>
                    </div>

                    <LocationPicker onLocationSelect={handleLocationChange}/>

                    <button type="submit" disabled={isSubmitting} className="btn btn-go-time w-100 py-3">
                        {isSubmitting ? "SYNCING..." : "COMMIT TO GRID!"}
                    </button>
                </form>
            </div>
        </div>
    );
}