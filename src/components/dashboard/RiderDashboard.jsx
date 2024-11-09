import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './RiderDashboard.css';

const RiderDashboard = () => {
  const { user } = useAuth();
  const [topDrivers, setTopDrivers] = useState([]);
  const [availableRides, setAvailableRides] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    fetchTopDrivers();
    fetchAvailableRides();
    fetchMyRequests();
  }, []);

  const fetchTopDrivers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/drivers/top');
      const data = await response.json();
      setTopDrivers(data);
    } catch (error) {
      console.error('Error fetching top drivers:', error);
    }
  };

  const fetchAvailableRides = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rides/available');
      const data = await response.json();
      setAvailableRides(data);
    } catch (error) {
      console.error('Error fetching available rides:', error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/rides/requests/${user._id}`);
      const data = await response.json();
      setMyRequests(data);
    } catch (error) {
      console.error('Error fetching my requests:', error);
    }
  };

  return (
    <div className="rider-dashboard">
      <div className="dashboard-section">
        <h2>Top Drivers</h2>
        <div className="drivers-list">
          {topDrivers.map((driver, index) => (
            <div key={index} className="driver-card">
              <div className="driver-rank">#{index + 1}</div>
              <div className="driver-info">
                <h3>{driver.name}</h3>
                <p>{driver.rating} ⭐</p>
                <p>{driver.totalRides} rides</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>My Ride Requests</h2>
        <div className="requests-list">
          {myRequests.map((request, index) => (
            <div key={index} className="request-card">
              <h3>{request.status}</h3>
              <p>From: {request.startLocation.address}</p>
              <p>To: {request.endLocation.address}</p>
              <p>Scheduled: {new Date(request.scheduledTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard; 