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
    const { cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage} = trip;
    const props = { cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage };

    return participants && (
      <Summary {...props} />
    )
  }

  const renderPrices = () => {
    const { publicIndividualCost, hotel, food, cars } = trip;

    const props = { publicIndividualCost, hotel, food, cars }

    return (
      <Prices {...props} />
    )
  }

  const renderParticipants = () => {
    const { participants, publicIndividualCost } = trip;
    const props = { participants, publicIndividualCost };

    return (
      <Participants {...props} />
    )
  }

  const renderTravelerProgress = () => {
    const { participants, publicIndividualCost } = trip;
    const props = { participants, publicIndividualCost };

    participants.reduce((acc, { payed }, i) => {
      return acc + payed
    }, 0)

    return (
      <TravelerProgress {...props} />
    )
  }

  if (!trip.participants) {
    return null;
  }

  return (
    <div className="App">
      {renderSummary()}
      <Spacer />
      {renderTravelerProgress()}
      <Spacer />
      {renderPrices()}
      {renderParticipants()}
    </div>
  );
}

export default App;
