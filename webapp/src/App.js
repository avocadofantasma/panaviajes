import axios from 'axios';
import React, { useState, useEffect } from 'react';

import './App.css';
import 'rsuite/dist/rsuite.min.css'

import Summary from './components/summary';
import Prices from './components/prices';
import TravelerProgress from './components/travelerProgress';
import TripList from './components/tripList';
import Footer from './components/footer';

function App() {
  const [trips, setTrips] = useState({
    activeTrip: 0,
    items: []
  })

  useEffect(() => {
    axios.get(`${window.location.origin.replace('3000', '3001')}/trips`).then(({ data }) => {
      setTrips({
        items: data,
        activeTrip: 0
      });
    }).catch(
      err => console.error(err)
    )
  }, [])

  const renderSummary = (trip) => {
    const { participants } = trip;

    return participants && (
      <Summary {...trip} />
    )
  }

  const renderPrices = (trip) => {
    const { isTravel } = trip;

    return isTravel && (
      <Prices {...trip} />
    )
  }

  const renderTravelerProgress = (trip) => {
    return (
      <TravelerProgress {...trip} />
    )
  }

  const trip = trips.items[trips.activeTrip];

  if (!trip) {
    return null;
  }

  return (
    <div className="App pt-2">
      <TripList {...trips} setTrips={setTrips} />
      {renderSummary(trip)}
      {renderPrices(trip)}
      {renderTravelerProgress(trip)}
      <Footer />
    </div>
  );
}

export default App;
