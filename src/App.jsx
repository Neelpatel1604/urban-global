import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RouteSelection from './pages/RouteSelection';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import Signup from './components/auth/Signup';
import Carpool from './pages/Carpool';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/route" element={<RouteSelection />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rider-dashboard" element={<RiderDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/carpool" element={<Carpool />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
