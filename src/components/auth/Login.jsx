import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    prestoCard: '',
    userType: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(credentials);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Urban Global</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>User Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="rider"
                  checked={credentials.userType === 'rider'}
                  onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
                  required
                />
                Want to Take a Ride
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="driver"
                  checked={credentials.userType === 'driver'}
                  onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
                />
                Want to Give a Ride
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="prestoCard">PRESTO Card Number</label>
            <input
              type="text"
              id="prestoCard"
              value={credentials.prestoCard}
              onChange={(e) => setCredentials({...credentials, prestoCard: e.target.value})}
              placeholder="Optional"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 