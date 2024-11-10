import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './RiderDashboard.css';

const RiderDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    carRides: 12,
    busRides: 8,
    carpoolRides: 15,
    carbonSaved: "180kg",
    treesEquivalent: 8,
    totalDistance: "450km"
  });

  const [recentTrips] = useState([
    {
      id: 1,
      type: "Carpool",
      from: "Home",
      to: "Office",
      date: "2024-03-20",
      carbonSaved: "12kg",
      distance: "15km"
    },
    {
      id: 2,
      type: "Bus",
      from: "Shopping Mall",
      to: "Downtown",
      date: "2024-03-19",
      carbonSaved: "8kg",
      distance: "10km"
    },
    {
      id: 3,
      type: "Carpool",
      from: "University",
      to: "Library",
      date: "2024-03-18",
      carbonSaved: "6kg",
      distance: "8km"
    }
  ]);

  return (
    <div className="rider-dashboard">
      <div className="dashboard-header">
        <h1>Rider Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🚗</span>
          <div className="stat-value">{stats.carRides}</div>
          <div className="stat-label">Carpool Rides</div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">🚌</span>
          <div className="stat-value">{stats.busRides}</div>
          <div className="stat-label">Bus Trips</div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">🌱</span>
          <div className="stat-value">{stats.carbonSaved}</div>
          <div className="stat-label">Carbon Saved</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="trip-history-section">
          <h2>Recent Trips</h2>
          <div className="trip-list">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="trip-card">
                <div className="trip-header">
                  <div className="trip-type">
                    <span className="transport-icon">
                      {trip.type === "Carpool" ? "🚗" : "🚌"}
                    </span>
                    <h3>{trip.type}</h3>
                  </div>
                  <span className="trip-date">{trip.date}</span>
                </div>
                <div className="trip-details">
                  <p><strong>From:</strong> {trip.from}</p>
                  <p><strong>To:</strong> {trip.to}</p>
                  <p><strong>Distance:</strong> {trip.distance}</p>
                  <p><strong>Carbon Saved:</strong> {trip.carbonSaved}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="environmental-impact-section">
          <h2>Environmental Impact</h2>
          <div className="impact-card">
            <div className="impact-item">
              <span className="impact-icon">🌳</span>
              <div className="impact-details">
                <h3>Trees Equivalent</h3>
                <p>{stats.treesEquivalent} trees worth of CO₂ absorbed</p>
              </div>
            </div>
            <div className="impact-item">
              <span className="impact-icon">🛣️</span>
              <div className="impact-details">
                <h3>Total Distance</h3>
                <p>{stats.totalDistance} traveled green</p>
              </div>
            </div>
            <div className="progress-container">
              <h3>Monthly Green Travel Goal</h3>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: '75%' }}
                  title="75% of monthly goal achieved"
                ></div>
              </div>
              <p>35/50 green trips this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard; 