import { useNavigate } from 'react-router-dom';
import './Home.css';
import RouteSelection from '../components/route/Route';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Urban Global</h1>
      <RouteSelection />
    </ div>
  );
};

export default Home; 