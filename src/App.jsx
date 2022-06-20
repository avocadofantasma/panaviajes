import React, { useState, useEffect } from "react";

import Logo from "./logo.jsx";
import "./App.css";
import "rsuite/dist/rsuite.min.css";

import Trip from "./components/trip.jsx";
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
            try {
                const { data } = await getTrips();
                setTrips({
                    items: data,
                    activeTrip: 0,
                });
            } catch (error) {
                console.log("error: ", error);
                setTrips({
                    items: [],
                    currentError: error,
                    activeTrip: 0,
                });
            }
        };
        fetchTrips();
    }, []);

    if (trips.legnth < 1) {
        return <h4>No hay viajes disponibles</h4>;
    }

    return (
        <div className="App mb-2 bg-white">
            <Logo />
            <TripList {...trips} setTrips={setTrips} />
            <Trip id={trips.activeTrip} />
            <Footer />
        </div>
    );
}

export default App;
