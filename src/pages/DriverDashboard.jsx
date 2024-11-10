import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalRides: 15,
    points: 750,
    carbonReduced: "125kg"
  });

  const [recentRides] = useState([
    {
      id: 1,
      from: "Downtown",
      to: "Airport",
      date: "2024-03-20",
      passengers: 2,
      points: 50,
      carbonSaved: "8kg"
    },
    {
      id: 2,
      from: "University",
      to: "Shopping Mall",
      date: "2024-03-19",
      passengers: 3,
      points: 45,
      carbonSaved: "7kg"
    },
    {
      id: 3,
      from: "Train Station",
      to: "Business Park",
      date: "2024-03-18",
      passengers: 2,
      points: 40,
      carbonSaved: "6kg"
    }
  ]);

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h1>Driver Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🚗</span>
          <div className="stat-value">{stats.totalRides}</div>
          <div className="stat-label">Total Rides</div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-value">{stats.points}</div>
          <div className="stat-label">Points Earned</div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">🌱</span>
          <div className="stat-value">{stats.carbonReduced}</div>
          <div className="stat-label">Carbon Reduced</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="ride-history-section">
          <h2>Recent Rides</h2>
          <div className="ride-list">
            {recentRides.map((ride) => (
              <div key={ride.id} className="ride-card">
                <div className="ride-header">
                  <h3>{ride.date}</h3>
                  <span className="points-earned">+{ride.points} points</span>
                </div>
                <div className="ride-details">
                  <p><strong>From:</strong> {ride.from}</p>
                  <p><strong>To:</strong> {ride.to}</p>
                  <p><strong>Passengers:</strong> {ride.passengers}</p>
                  <p><strong>Carbon Saved:</strong> {ride.carbonSaved}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h2>Monthly Goals</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <span className="achievement-icon">🎯</span>
              <h3>Rides Goal</h3>
              <p>15/20 rides</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="achievement-card">
              <span className="achievement-icon">🌍</span>
              <h3>Carbon Goal</h3>
              <p>125/150 kg reduced</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard; 