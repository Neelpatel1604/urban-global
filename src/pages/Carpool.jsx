import React from 'react';
import './Carpool.css';

const Carpool = () => {
  const rideRequests = [
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
  ];

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
              <button className="offer-button">Offer Ride</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carpool; 