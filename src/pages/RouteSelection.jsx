import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import './RouteSelection.css';

// Add Mapbox GL CSS directly to the component
const mapboxStyles = document.createElement('link');
mapboxStyles.rel = 'stylesheet';
mapboxStyles.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
document.head.appendChild(mapboxStyles);

// Replace with your Mapbox access token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmVlbDIwMDQiLCJhIjoiY20zYWU4eTl1MWFrbDJ3cTJxZnIycGxkZSJ9.mMjStxQytumMjT6NqcaT_A';

const RouteSelection = () => {
  const [viewState, setViewState] = useState({
    latitude: 43.6832, // Brampton coordinates
    longitude: -79.7666,
    zoom: 12
  });

  const [route, setRoute] = useState({
    start: '',
    startCoords: null,
    end: '',
    endCoords: null
  });

  const [loading, setLoading] = useState(false);

  const [showLiveLocation, setShowLiveLocation] = useState(false);
  const [liveLocation, setLiveLocation] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [busData, setBusData] = useState([]);

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions] = useState([
    { id: 1, text: "Use current location", icon: "📍" },
    { id: 2, text: "Choose on map", icon: "🗺️" }
  ]);

  const [selectedTransportMode, setSelectedTransportMode] = useState(null);
  const [busRoutes, setBusRoutes] = useState([
    {
      number: '1',
      from: "Downtown",
      to: "University",
      nextBus: "5 mins",
      duration: "30 mins",
      occupancy: 75,
      nextStops: [
        { name: "Wellignton St", time: "10 mins", occupancy: 65 },
        { name: "MainSt at Sproule Dr", time: "15 mins", occupancy: 55 }
      ]
    },
    {
      number: '3',
      from: "Mall",
      to: "Business District",
      nextBus: "8 mins",
      duration: "25 mins",
      occupancy: 90,
      nextStops: [
        { name: "Market ", time: "12 mins", occupancy: 80 },
        { name: "Tech Hub", time: "18 mins", occupancy: 70 }
      ]
    },
    {
      number: '7',
      from: "Residential Area",
      to: "Shopping Center",
      nextBus: "3 mins",
      duration: "35 mins",
      occupancy: 45,
      nextStops: [
        { name: "Green Park", time: "8 mins", occupancy: 40 },
        { name: "Library", time: "15 mins", occupancy: 35 }
      ]
    }
  ]);

  const [carpoolOptions, setCarpoolOptions] = useState([
    {
      driverName: "John D.",
      rating: 4.8,
      departure: "9:00 AM",
      seats: 3,
      carModel: "Toyota Camry",
      time: "15 mins"
    },
    {
      driverName: "Sarah M.",
      rating: 4.9,
      departure: "9:15 AM",
      seats: 2,
      carModel: "Honda Civic",
      time: "15 mins"
    },
    {
      driverName: "Mike R.",
      rating: 4.7,
      departure: "9:30 AM",
      seats: 4,
      carModel: "Tesla Model 3",
      time: "15 mins"
    }
  ]);

  const [showOptions, setShowOptions] = useState(false);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { longitude, latitude, place_name: data.features[0].place_name };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const handleLocationSearch = async (type) => {
    const address = route[type];
    if (!address) return;

    setLoading(true);
    const result = await geocodeAddress(address);
    setLoading(false);

    if (result) {
      setRoute(prev => ({
        ...prev,
        [type]: result.place_name,
        [`${type}Coords`]: { latitude: result.latitude, longitude: result.longitude }
      }));

      if (type === 'start') {
        setViewState(prev => ({
          ...prev,
          latitude: result.latitude,
          longitude: result.longitude,
          zoom: 13
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (route.startCoords && route.endCoords) {
      setShowOptions(true);
      setSelectedTransportMode(null);
    }
  };

  // Add live location detection
  const detectLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
          // Reverse geocode to get address
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setRoute(prev => ({
          ...prev,
          start: data.features[0].place_name
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  const handleInputFocus = () => {
    if (!route.start) {
      setShowSearchSuggestions(true);
    }
  };

  const handleInputChange = (e) => {
    setRoute({ ...route, start: e.target.value });
    setShowSearchSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.text === "Use current location") {
      detectLiveLocation();
    } else if (suggestion.text === "Choose on map") {
      // Handle map selection
      console.log("Map selection to be implemented");
    }
    setShowSearchSuggestions(false);
  };

  const handleTransportModeSelect = (mode) => {
    setSelectedTransportMode(mode);
  };

  const renderTransportOptions = () => {
    if (!selectedTransportMode) {
      return (
        <div className="options-list">
          <div 
            className="option-card"
            onClick={() => handleTransportModeSelect('bus')}
          >
            <h3>🚌 Bus Route</h3>
            <p>Next bus in 5 mins</p>
            <p>From $3.40</p>
          </div>
          <div 
            className="option-card"
            onClick={() => handleTransportModeSelect('carpool')}
          >
            <h3>🚗 Carpool</h3>
            <p>3 drivers nearby</p>
            <p>Time: 15 mins</p>
          </div>
          <div 
            className="option-card"
            onClick={() => handleTransportModeSelect('bicycle')}
          >
            <h3>🚲 Bicycle</h3>
            <p>5 bikes available</p>
            <p>Eco-friendly option</p>
          </div>
        </div>
      );
    }

    switch (selectedTransportMode) {
      case 'bus':
        return (
          <div className="bus-routes-list">
            {busRoutes.map((route, index) => (
              <div key={index} className="bus-route-card">
                <div className="route-header">
                  <h3>Route {route.number}</h3>
                  <span className="next-bus">Next bus: {route.nextBus}</span>
                </div>
                <div className="route-info">
                  <div className="occupancy-info">
                    <span>Current Occupancy:</span>
                    <div className="occupancy-bar">
                      <div 
                        className="occupancy-fill"
                        style={{ width: `${route.occupancy}%` }}
                      ></div>
                    </div>
                    <span>{route.occupancy}% full</span>
                  </div>
                  <div className="time-info">
                    <p>Duration: {route.duration}</p>
                  </div>
                  {route.occupancy > 85 && (
                    <div className="next-stops">
                      <h4>Next Available Stops:</h4>
                      {route.nextStops.map((stop, idx) => (
                        <div key={idx} className="stop-info">
                          <span>{stop.name}</span>
                          <span>In {stop.time}</span>
                          <span>{stop.occupancy}% full</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'carpool':
        return (
          <div className="carpool-options-list">
            {carpoolOptions.map((option, index) => (
              <div key={index} className="carpool-option-card">
                <div className="driver-info">
                  <h3>{option.driverName}</h3>
                  <div className="rating">⭐ {option.rating}</div>
                </div>
                <div className="ride-details">
                  <p>🚗 {option.carModel}</p>
                  <p>⏰ Departure: {option.departure}</p>
                  <p>💺 Available seats: {option.seats}</p>
                  <p>⏰ Time: {option.time}</p>
                </div>
                <button className="book-ride-btn">Book Ride</button>
              </div>
            ))}
          </div>
        );

      case 'bicycle':
        return (
          <div className="bicycle-info-card">
            <div className="environmental-impact">
              <h3>Environmental Impact</h3>
              <p>🌱 CO2 Saved: 2.5 kg</p>
              <p>🔥 Calories Burned: ~450</p>
              <p>🌍 Green Points: +50</p>
            </div>
            <div className="bike-stations">
              <h3>Nearby Stations</h3>
              <div className="stations-list">
                <div className="station">
                  <h4>Central Station</h4>
                  <p>🚲 8 bikes available</p>
                  <p>📍 0.5 km away</p>
                </div>
                <div className="station">
                  <h4>Park Station</h4>
                  <p>🚲 5 bikes available</p>
                  <p>📍 1.2 km away</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="route-selection">
      <h1>Plan Your Route</h1>
      
      <div className="route-container">
        <div className="route-form-container">
          <form onSubmit={handleSubmit} className="route-form">
            <div className="form-group">
              <label htmlFor="start">Start Location</label>
              <div className="input-with-buttons">
                <div className="input-wrapper">
                  <input
                    id="start"
                    value={route.start}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Enter start location"
                  />
                  {showSearchSuggestions && (
                    <div className="search-options">
                      {searchSuggestions.map(suggestion => (
                        <div
                          key={suggestion.id}
                          className="search-option"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span className="option-icon">{suggestion.icon}</span>
                          <span className="option-text">{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  type="button" 
                  onClick={() => handleLocationSearch('start')}
                  disabled={loading || !route.start}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="end">Destination</label>
              <div className="input-with-button">
                <input
                  id="end"
                  value={route.end}
                  onChange={(e) => setRoute({ ...route, end: e.target.value })}
                  placeholder="Enter destination"
                />
                <button 
                  type="button" 
                  onClick={() => handleLocationSearch('end')}
                  disabled={loading || !route.end}
                >
                  Search
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="find-routes-btn"
              disabled={!route.startCoords || !route.endCoords}
            >
              Find Routes
            </button>
          </form>

          {showOptions && (
            <div className="transport-options">
              <h2>Available Options</h2>
              {renderTransportOptions()}
              {selectedTransportMode && (
                <button 
                  className="back-button"
                  onClick={() => setSelectedTransportMode(null)}
                >
                  ← Back to all options
                </button>
              )}
            </div>
          )}
        </div>

        <div className="map-container">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl position="top-right" />
            
            {route.startCoords && (
              <Marker
                longitude={route.startCoords.longitude}
                latitude={route.startCoords.latitude}
                color="#00ff00"
              />
            )}
            
            {route.endCoords && (
              <Marker
                longitude={route.endCoords.longitude}
                latitude={route.endCoords.latitude}
                color="#ff0000"
              />
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

// Helper functions to generate fake data
const generateBusRoutes = () => [
  {
    number: '1',
    occupancy: 75,
    nextBus: '5 mins',
    duration: '30 mins'
  },
  {
    number: '3',
    occupancy: 45,
    nextBus: '10 mins',
    duration: '35 mins'
  },
  {
    number: '7',
    occupancy: 90,
    nextBus: '3 mins',
    duration: '28 mins'
  }
];

const generateCarpoolOptions = () => [
  {
    driverName: 'John D.',
    rating: 4.8,
    departure: '9:00 AM',
    seats: 3
  },
  {
    driverName: 'Sarah M.',
    rating: 4.9,
    departure: '9:15 AM',
    seats: 2
  }
];

const generateNearbyStations = () => [
  {
    name: 'Central Station',
    distance: '0.5 km',
    bikes: 8
  },
  {
    name: 'Park Station',
    distance: '1.2 km',
    bikes: 5
  }
];

export default RouteSelection; 