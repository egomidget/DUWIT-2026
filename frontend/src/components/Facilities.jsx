import React from 'react';

// The "Candy Map" - maps backend strings to UI icons
const iconMap = {
    "wifi": "bi-wifi",
    "power": "bi-lightning-charge-fill",
    "coffee": "bi-cup-hot",
    "quiet": "bi-volume-mute",
    "parking": "bi-p-circle",
    "ac": "bi-thermometer-snow",
    "microwave": "bi-cup-hot",
    "printer": "bi-printer"
};

export default function Facilities({ items }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {items.map((item, index) => {
                const iconClass = iconMap[item.toLowerCase()] || "bi-star-fill";
                
                return (
                    <div key={index} className="facility-pill d-flex align-items-center">
                        <i className={`bi ${iconClass} me-2 text-pink`}></i>
                        <span className="text-capitalize small fw-bold">{item}</span>
                    </div>
                );
            })}
        </div>
    );
}