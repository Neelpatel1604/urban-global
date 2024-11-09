import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRides: 0,
    totalEarnings: 0,
    rating: 0,
    completedTrips: 0
  });
  const [activeRides, setActiveRides] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    fetchDriverStats();
    fetchActiveRides();
    fetchRideRequests();
  }, []);

  const fetchDriverStats = async () => {
    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching driver stats:', error);
    }
  };

  const fetchActiveRides = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('driver_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setActiveRides(data || []);
    } catch (error) {
      console.error('Error fetching active rides:', error);
    }
  };

  const fetchRideRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('ride_requests')
        .select('*')
        .eq('status', 'pending');

      if (error) throw error;
      setRideRequests(data || []);
    } catch (error) {
      console.error('Error fetching ride requests:', error);
    }
  };

  const acceptRideRequest = async (requestId) => {
    try {
      const { error } = await supabase
        .from('ride_requests')
        .update({ status: 'accepted', driver_id: user.id })
        .eq('id', requestId);

      if (error) throw error;
      fetchRideRequests();
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h1>Driver Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Rides</h3>
            <p>{stats.totalRides}</p>
          </div>
          <div className="stat-card">
            <h3>Earnings</h3>
            <p>${stats.totalEarnings}</p>
          </div>
          <div className="stat-card">
            <h3>Rating</h3>
            <p>{stats.rating}⭐</p>
          </div>
          <div className="stat-card">
            <h3>Completed Trips</h3>
            <p>{stats.completedTrips}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="active-rides-section">
          <h2>Active Rides</h2>
          <div className="rides-list">
            {activeRides.map((ride) => (
              <div key={ride.id} className="ride-card">
                <h3>Current Ride</h3>
                <p>From: {ride.start_location}</p>
                <p>To: {ride.end_location}</p>
                <p>Passenger: {ride.rider_name}</p>
                <button className="complete-btn">Complete Ride</button>
              </div>
            ))}
          </div>
        </div>

        <div className="ride-requests-section">
          <h2>Available Ride Requests</h2>
          <div className="requests-list">
            {rideRequests.map((request) => (
              <div key={request.id} className="request-card">
                <h3>New Request</h3>
                <p>From: {request.start_location}</p>
                <p>To: {request.end_location}</p>
                <p>Estimated fare: ${request.estimated_fare}</p>
                <button 
                  className="accept-btn"
                  onClick={() => acceptRideRequest(request.id)}
                >
                  Accept Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard; 