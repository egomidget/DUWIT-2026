import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import './CandySpinner.css';

// segments to be set via api.
const CandySpinner = ({ segments = ['Gummy Bear', 'Lollipop', 'Cotton Candy', 'Choco Bar', 'Sour Patch', 'Jelly Bean'] }) => {
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

            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="candy-modal">
                <Modal.Header closeButton className="candy-stripe">
                    <Modal.Title className="sugar-font text-white">Sweet Victory!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <h2 className="sugar-font text-pink mb-4">You Won:</h2>
                    <div className="winner-display sugar-font">{winner}</div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="btn-sugar" onClick={() => setShowModal(false)}>
                        YUMMY!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CandySpinner;
