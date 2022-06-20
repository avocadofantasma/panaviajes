import React from "react";

import PriceCard from "./priceCard";

const TravelerSummary = ({ participants, originDestination }) => {
    const { departureTime, departureDate, returnDate, origin } =
        originDestination;
    const title = `Vamos a ${originDestination.destination}`;
    const tags = [
        {
            label: "Invitados",
            value: participants.length,
            isStr: true,
        },
        {
            label: "Hora de salida",
            value: departureTime,
            isStr: true,
        },
        {
            label: "Nos vamos el",
            isStr: true,
            value: departureDate,
        },
        {
            label: "Volvemos el",
            isStr: true,
            value: returnDate,
        },
        {
            label: "Partimos de",
            isStr: true,
            value: origin,
        },
    ];

    return <PriceCard {...{ title, tags }} />;
};

export default TravelerSummary;
