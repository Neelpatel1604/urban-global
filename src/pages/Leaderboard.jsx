import { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('carpool');

  const carpoolLeaders = [
    { name: 'Neel', points: 1500, rank: 1 },
    { name: 'Prathmesh', points: 1350, rank: 2 },
    { name: 'Preyas', points: 1200, rank: 3 },
    { name: 'Rohit', points: 1100, rank: 4 },
    { name: 'Soham', points: 1000, rank: 5 },
    { name: 'Saad', points: 850, rank: 12 }
  ];

  const cyclingLeaders = [
    { name: 'Saad', points: 2000, rank: 1 },
    { name: 'Simran', points: 1800, rank: 2 },
    { name: 'Arshdeep', points: 1600, rank: 3 },
    { name: 'Anirudh', points: 1400, rank: 4 },
    { name: 'Het', points: 1200, rank: 5 },
    { name: 'Preyas', points: 950, rank: 15 }
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
        {(activeTab === 'carpool' ? carpoolLeaders : cyclingLeaders).map((leader) => (
          <div 
            key={leader.rank} 
            className="leader-card"
            data-rank={leader.rank}
          >
            <div className="rank">#{leader.rank}</div>
            <div className="name">{leader.name}</div>
            <div className="points">{leader.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 