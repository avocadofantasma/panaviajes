import React from 'react'

import CardGroup from 'react-bootstrap/CardGroup'

import TotalCost from './totalCost';
import TravelerSummary from './travelerSummary';

const renderTotalCost = (cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage) => {
    const props = { cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage };

    return (
        <TotalCost {...props} />
    )
}

const renderTravelerSummary = (participants, publicIndividualCost) => {
    const props = { publicIndividualCost, participants };

    return (
        <TravelerSummary {...props} />
    )
}

const Summary = ({ cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage }) => {
    return (
        <CardGroup>
            {renderTotalCost(cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage)}
            {renderTravelerSummary(participants, publicIndividualCost)}
        </CardGroup>
    )
}

export default Summary