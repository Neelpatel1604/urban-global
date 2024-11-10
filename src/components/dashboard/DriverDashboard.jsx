import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [stats, setStats] = useState({
    totalRides: 0,
    earnings: 0,
    rating: 0
  });

  useEffect(() => {
    // Fetch driver's rides and stats
    const fetchDriverData = async () => {
      // Implementation for fetching driver data
    };

    fetchDriverData();
  }, []);

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Statistics</h2>
          <div className="dashboard-stats">
            <div className="stat-item">
              <span className="stat-label">Total Rides</span>
              <span className="stat-value">{stats.totalRides}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Earnings</span>
              <span className="stat-value">${stats.earnings}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rating</span>
              <span className="stat-value">{stats.rating}/5</span>
            </div>
          </div>
        </div>
        {/* Add more dashboard cards for active rides, history, etc. */}
      </div>
    </div>
  );
};

export default DriverDashboard; 