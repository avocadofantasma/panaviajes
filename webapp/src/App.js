import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Summary from './components/summary';
import Prices from './components/prices';
import Participants from './components/participants';
import Spacer from './components/spacing';
import TravelerProgress from './components/travelerProgress';

function App() {
  const [trip, setTrip] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/trip').then(({ data }) => {
      setTrip(data)
    }).catch(
      err => console.error(err)
    )
  })

  const renderSummary = () => {
    const { participants } = trip;

    return participants && (
      <Summary {...trip} />
    )
  }

  const renderPrices = () => {
    return (
      <Prices {...trip} />
    )
  }

  const renderParticipants = () => {
    return (
      <Participants {...trip} />
    )
  }

  const renderTravelerProgress = () => {
    return (
      <TravelerProgress {...trip} />
    )
  }

  if (!trip.participants) {
    return null;
  }

  return (
    <div className="App">
      {renderSummary()}
      {renderPrices()}
      {renderTravelerProgress()}
      <Spacer />
      {renderParticipants()}
    </div>
  );
}

export default App;
