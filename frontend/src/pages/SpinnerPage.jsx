import { useState, useEffect } from 'react';
import CandySpinner from '../components/CandySpinner';
import Card from '../components/Card';
import CandyDivider from '../components/CandyDivider';

const SpinnerPage = () => {
    // default prizes
    const [prizes, setPrizes] = useState(['Gummy Bear', 'Lollipop', 'Cotton Candy', 'Choco Bar', 'Sour Patch', 'Jelly Bean', 'Gumdrop', 'Taffy']);
    const [leaderboard, setLeaderboard] = useState([]);

    //to refresh the leaderboard
    const fetchLeaderboard = () => {
        fetch(`http://127.0.0.1:8000/api/log-winner/leaderboard/`)
            .then(res => res.json())
            .then(data => setLeaderboard(data));
    };

    useEffect(() => {
        fetch(`/api/prizes`)
            .then((res) => res.json())
            .then((data) => setPrizes(data))
            .catch((err) => console.log("Glitch in the system!", err));
        fetch(`/api/log-winner/leaderboard/`)
        .then((res) => res.json())
        .then((data) => setLeaderboard(data))
        .catch((err) => console.log("Leaderboard glitch!", err));
        fetchLeaderboard();
    }, []);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <Card header="Sweet Rewards Wheel">
                        <p className="sugar-font">Feeling lucky? Spin the candy wheel to win a sweet treat while you study, win discounts on sweet treats near you!</p>
                    </Card>
                    
                    <div className="mt-5">
                        <CandySpinner segments={prizes} onWin={fetchLeaderboard}/>
                    </div>
                    {/*Leaderboard going here !) */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-10"> {/* Slightly wider for desktop */}
                            <div className="p-4 rounded-4 shadow-lg bg-white border border-3 border-primary-subtle">
                                <h3 className="sugar-font text-center mb-4" style={{ color: '#ff4d94' }}>
                                    🍬 Hall of Sweets 🍬
                                </h3>
                                <div className="leaderboard-list text-start">
                                    {leaderboard.map((entry, index) => (
                                        <div key={index} className={`d-flex align-items-center justify-content-between p-3 mb-2 rounded-pill ${index === 0 ? 'bg-warning-subtle shadow-sm' : 'bg-light'}`}>
                                            <div className="d-flex align-items-center">
                                                <span className="badge rounded-circle me-3" style={{ backgroundColor: '#ff4d94' }}>{index + 1}</span>
                                                <span className="fw-bold">{entry.display_name}</span>
                                            </div>
                                            <span className="fw-bold">{entry.total_wins} 🍭</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
