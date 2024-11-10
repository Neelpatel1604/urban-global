import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RiderDashboard from './RiderDashboard';
import DriverDashboard from './DriverDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.userType || 'rider');

  return (
    <div className="dashboard">
      <div className="role-selector">
        <button 
          className={`role-button ${selectedRole === 'rider' ? 'active' : ''}`}
          onClick={() => setSelectedRole('rider')}
        >
          🚶 Rider
        </button>
        <button 
          className={`role-button ${selectedRole === 'driver' ? 'active' : ''}`}
          onClick={() => setSelectedRole('driver')}
        >
          🚗 Driver
        </button>
      </div>

      {selectedRole === 'rider' ? (
        <RiderDashboard />
      ) : (
        <DriverDashboard />
      )}
    </div>
  );
};

export default Dashboard; 