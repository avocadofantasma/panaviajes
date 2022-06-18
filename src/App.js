import React, { useState, useEffect } from "react";

import Logo from "./logo.jsx";
import "./App.css";
import "rsuite/dist/rsuite.min.css";

import Summary from "./components/summary";
import Prices from "./components/prices";
import TravelerProgress from "./components/travelerProgress";
import TripList from "./components/tripList";
import Footer from "./components/footer";

import { getTrips } from "./requests.js";

function App() {
    const [trips, setTrips] = useState({
        activeTrip: 0,
        items: [],
    });

    useEffect(() => {
        const fetchTrips = async () => {
            const { data } = await getTrips();
            setTrips({
                items: data,
                activeTrip: 0,
            });
        };
        fetchTrips();
    }, []);

    const renderSummary = (trip) => {
        const { participants } = trip;

        return participants && <Summary {...trip} />;
    };

    const renderPrices = (trip) => {
        const { isTravel } = trip;

        return isTravel && <Prices {...trip} />;
    };

    const renderTravelerProgress = (trip, setTrips) => {
        return <TravelerProgress trip={trip} setTrips={setTrips} />;
    };

    const trip = trips.items[trips.activeTrip];

    if (!trip) {
        return null;
    }

    return (
        <div className="App mb-2 bg-white">
            <div className="text-center bg-dark">
                <Logo />
            </div>
            <TripList {...trips} setTrips={setTrips} />
            {renderSummary(trip)}
            {renderPrices(trip)}
            {renderTravelerProgress(trip, setTrips)}
            <Footer />
        </div>
    );
}

export default App;
