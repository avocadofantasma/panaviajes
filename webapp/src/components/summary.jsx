import React from 'react'

import CardGroup from 'react-bootstrap/CardGroup'

import TotalCost from './totalCost';
import TravelerSummary from './travelerSummary';

const renderTotalCost = (trip) => {
    return (
        <TotalCost {...trip} />
    )
}

const renderTravelerSummary = (trip) => {
    return (
        <TravelerSummary {...trip} />
    )
}

const Summary = (trip) => {
    return (
        <CardGroup>
            {renderTotalCost(trip)}
            {renderTravelerSummary(trip)}
        </CardGroup>
    )
}

export default Summary