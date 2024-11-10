import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/route">Urban Global</Link>
      </div>
      <div className="navbar-links">
        <Link to="/carpool">Carpool</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/route" className="nav-link">Plan Route</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar; 