import React, { useState } from 'react';
import './Carpool.css';

const Carpool = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [rideRequests] = useState([
    {
      id: 1,
      passenger: "Perays",
      from: "12 Giltspur Road",
      to: "Algoma University",
      date: "2024-03-25",
      time: "09:00",
      passengers: 2
    },
    {
      id: 2,
      passenger: "Enoch",
      from: "45 Windmill Road",
      to: "3 Stemford Road",
      date: "2024-03-26",
      time: "08:30",
      passengers: 1
    },
    {
      id: 3,
      passenger: "Sad",
      from: "3 Morton Way",
      to: "17 Hammerheat Road",
      date: "2024-03-26",
      time: "15:30",
      passengers: 3
    }
  ]);

  const handleOfferRide = (requestId) => {
    setShowSuccessPopup(true);
    
    // Start hiding animation after 2.5 seconds
    setTimeout(() => {
      setIsHiding(true);
    }, 2500);

    // Remove popup after animation completes
    setTimeout(() => {
      setShowSuccessPopup(false);
      setIsHiding(false);
    }, 2800);
  };

  return (
    <div className="carpool-container">
      <h1>Ride Requests</h1>
      <div className="rides-container">
        <div className="rides-list">
          {rideRequests.map(request => (
            <div key={request.id} className="ride-card">
              <h3>Passenger: {request.passenger}</h3>
              <div className="ride-details">
                <p><strong>From:</strong> {request.from}</p>
                <p><strong>To:</strong> {request.to}</p>
                <p><strong>Date:</strong> {request.date}</p>
                <p><strong>Time:</strong> {request.time}</p>
                <p><strong>Number of Passengers:</strong> {request.passengers}</p>
              </div>
              <button 
                className="offer-button"
                onClick={() => handleOfferRide(request.id)}
              >
                Offer Ride
              </button>
            </div>
          ))}
        </div>
      </div>

      {showSuccessPopup && (
        <div className={`success-popup ${isHiding ? 'hiding' : ''}`}>
          <div className="popup-content">
            <span className="success-icon">✅</span>
            <h3>Ride Offered Successfully!</h3>
            <p>The passenger will be notified of your offer.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carpool; 