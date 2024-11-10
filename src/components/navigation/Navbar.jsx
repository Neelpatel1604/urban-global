import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/route">Urban Global</Link>
      </div>
      <div className="navbar-links">
<<<<<<< HEAD
        <Link to="/carpool">Carpool</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/route" className="nav-link">Plan Route</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
=======
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/route">Find Route</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
>>>>>>> d1f40888d84fd09432ce18b5aef86bb759b7f91c
      </div>
    </nav>
  );
};

export default Navbar; 