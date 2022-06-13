import React from 'react'

import PriceCard from './priceCard';
import Card from 'react-bootstrap/Card'

const TravelerSummary = ({ publicIndividualCost, participants, originDestination }) => {
    const { departureTime, departureDate, returnDate, origin } = originDestination;
    const title = `Vamos a ${originDestination.destination}`;
    const isMoney = false;
    const tags = [
        {
            label: "Invitados",
            value: participants.length
        },
        {
            label: "Hora de salida",
            value: departureTime
        },
        {
            label: "Nos vamos el",
            isStr: true,
            value: departureDate
        },
        {
            label: "Volvemos el",
            isStr: true,
            value: returnDate
        },
        {
            label: "Partimos de",
            isStr: true,
            value: origin
        },
    ];

    return <PriceCard {...{ title, tags, isMoney }} />
}

export default TravelerSummary