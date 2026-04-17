import { useState } from "react";
import './CandySpinner.css';
import PrizeForm from './PrizeForm';

// segments to be set via api.
export default function CandySpinner ({ segments = ['Gummy Bear', 'Lollipop', 'Cotton Candy', 'Choco Bar', 'Sour Patch', 'Jelly Bean'] }) {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState('');

    const spinWheel = () => {
        if (spinning) return;

        const newRotation = rotation + 1440 + Math.floor(Math.random() * 360);
        setRotation(newRotation);
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
            determineWinner(newRotation);
        }, 5000);
    };

    const determineWinner = (finalRotation) => {
        const degrees = finalRotation % 360;
        const segmentAngle = 360 / segments.length;
        const adjustedDegrees = (360 - degrees) % 360;
        const winnerIndex = Math.floor(adjustedDegrees / segmentAngle);
        setWinner(segments[winnerIndex]);
        setShowModal(true);
    };

    return (
        <div className="spinner-container">
            <div className="wheel-wrapper">
                <div className="wheel-pointer">▼</div>
                <div 
                    className={`wheel ${spinning ? 'is-spinning' : ''}`} 
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {segments.map((segment, index) => {
                        const colors = ['var(--strawberry-pink)', 'var(--mint-green)', 'var(--grape-purple)', 'var(--lemon-yellow)'];
                        return (
                            <div 
                                key={index} 
                                className="wheel-segment" 
                                style={{ 
                                    '--i': index, 
                                    '--count': segments.length,
                                    '--bg-color': colors[index % colors.length]
                                }}
                            >
                                <span className="segment-label sugar-font">{segment}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <button className="btn-go-time mt-4" onClick={spinWheel} disabled={spinning}>
                {spinning ? 'SPINNING...' : 'SPIN THE WHEEL!'}
            </button>

            <PrizeForm 
                winner={winner} 
                showModal={showModal} 
                setShowModal={setShowModal} 
            />
        </div>
    );
};