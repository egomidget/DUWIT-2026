import { useState, useEffect } from 'react';
import CandySpinner from '../components/CandySpinner';
import Card from '../components/Card';
import CandyDivider from '../components/CandyDivider';

const SpinnerPage = () => {
    // default prizes
    const [prizes, setPrizes] = useState(['Gummy Bear', 'Lollipop', 'Cotton Candy', 'Choco Bar', 'Sour Patch', 'Jelly Bean', 'Gumdrop', 'Taffy']);

    useEffect(() => {
        fetch(`http://local:8000/api/prizes`)
            .then((res) => res.json())
            .then((data) => setPrizes(data))
            .catch((err) => console.log("Glitch in the system!", err));
    }, null);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <Card header="Sweet Rewards Wheel">
                        <p className="sugar-font">Feeling lucky? Spin the candy wheel to win a sweet treat while you study, win discounts on sweet treats near you!</p>
                    </Card>
                    
                    <div className="mt-5">
                        <CandySpinner segments={prizes} />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <CandyDivider />
            </div>
        </div>
    );
};

export default SpinnerPage;
