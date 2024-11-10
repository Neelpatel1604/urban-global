import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './components/dashboard/DriverDashboard';
import RiderDashboard from './components/dashboard/RiderDashboard';
import RouteSelection from './pages/RouteSelection';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
<<<<<<< HEAD
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import Signup from './components/auth/Signup';
import Carpool from './pages/Carpool';
=======
import Signup from './components/auth/Signup';
>>>>>>> d1f40888d84fd09432ce18b5aef86bb759b7f91c
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

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
<<<<<<< HEAD
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/route" element={<RouteSelection />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rider-dashboard" element={<RiderDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/carpool" element={<Carpool />} />
=======
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Navigate to="/rider/dashboard" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/driver/dashboard" 
              element={
                <ProtectedRoute>
                  <DriverDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rider/dashboard" 
              element={
                <ProtectedRoute>
                  <RiderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/route" 
              element={
                <ProtectedRoute>
                  <RouteSelection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
>>>>>>> d1f40888d84fd09432ce18b5aef86bb759b7f91c
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
