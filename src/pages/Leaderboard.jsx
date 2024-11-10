import { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('carpool');

  const carpoolLeaders = [
    { name: 'Neel', points: 1500 },
    { name: 'Prathmesh', points: 1350 },
    { name: 'Preyas', points: 1200 },
    { name: 'Rohit', points: 1100 },
    { name: 'Soham', points: 1000 }
  ];

  const cyclingLeaders = [
    { name: 'Saad', points: 2000 },
    { name: 'Simran', points: 1800 },
    { name: 'Arshdeep', points: 1600 },
    { name: 'Anirudh', points: 1400 },
    { name: 'Het', points: 1200 }
  ];

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      
      <div className="tab-buttons">
        <button 
          className={activeTab === 'carpool' ? 'active' : ''}
          onClick={() => setActiveTab('carpool')}
        >
          🚗 Carpool
        </button>
        <button 
          className={activeTab === 'cycling' ? 'active' : ''}
          onClick={() => setActiveTab('cycling')}
        >
          🚴 Cycling
        </button>
      </div>

      <div className="leaders-list">
        {(activeTab === 'carpool' ? carpoolLeaders : cyclingLeaders).map((leader, index) => (
          <div key={index} className="leader-card">
            <div className="rank">#{index + 1}</div>
            <div className="name">{leader.name}</div>
            <div className="points">{leader.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 