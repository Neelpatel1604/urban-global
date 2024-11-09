import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    userType: 'rider'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signup(credentials);
      
      if (result.success) {
        // Navigate based on the user type
        navigate(result.userType === 'driver' ? '/driver/dashboard' : '/rider/dashboard');
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <select
              value={credentials.userType}
              onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
              required
            >
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button 
            className="signup-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="alternative-auth">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 