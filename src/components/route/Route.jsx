import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Route.css';

const RouteSelection = () => {
  const { user } = useAuth();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState(null);

  const handleRouteSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Calculate the route
    // 2. Calculate estimated fare
    // 3. Show available drivers
    try {
      // Placeholder for fare calculation
      const calculatedFare = Math.floor(Math.random() * 30) + 10; // Random fare between 10-40
      setFare(calculatedFare);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  return (
    <div className="route-container">
      <div className="route-card">
        <h2>Plan Your Route</h2>
        <form onSubmit={handleRouteSubmit}>
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              required
            />
          </div>
          <div className="form-group">
            <label>Dropoff Location</label>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter destination"
              required
            />
          </div>
          <button type="submit" className="calculate-btn">
            Calculate Route
          </button>
        </form>
        
        {fare && (
          <div className="fare-estimate">
            <h3>Estimated Fare</h3>
            <p className="fare-amount">${fare}</p>
            <button className="book-ride-btn">Book Ride</button>
          </div>
        )}
      </div>
      
      <div className="map-container">
        {/* Map will be implemented here */}
        <div className="map-placeholder">
          Map will be displayed here
        </div>
      </div>
    </div>
  );
};

export default RouteSelection; 