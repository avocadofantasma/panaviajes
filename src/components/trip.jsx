import React, { useEffect, useState } from "react";

import Summary from "./summary";
import Prices from "./prices";
import TravelerProgress from "./travelerProgress";
import { getTrip } from "../requests.js";

const Trip = ({ id, isAdmin }) => {
    const [trip, setTrip] = useState({});

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const { data } = await getTrip(id);
                setTrip(data);
            } catch (error) {
                console.log("error: ", error);
                setTrip({
                    currentError: error,
                });
            }
        };
        fetchTrip();
    }, [id]);

    const renderSummary = () => {
        const { participants } = trip;

        return participants && <Summary {...trip} />;
    };

    const renderPrices = () => {
        const { isTravel } = trip;

        return isTravel && <Prices {...trip} />;
    };

    const renderTravelerProgress = () => {
        return (
            <TravelerProgress trip={trip} setTrip={setTrip} isAdmin={isAdmin} />
        );
    };

    if (!trip || Object.keys(trip).length === 0) {
        return null;
    }

    return (
        <div>
            {renderSummary(trip)}
            {renderPrices(trip)}
            {renderTravelerProgress()}
        </div>
    );
};

export default Trip;
