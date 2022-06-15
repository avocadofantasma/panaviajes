const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const TRIP_TAPALPA = require('./trip_tapalpa.json');
const TRIP_CANCUN = require('./trip_cancun.json');
const TRIP_THOR = require('./trip_thor.json');
const TRIPS = [TRIP_TAPALPA, TRIP_CANCUN, TRIP_THOR];

const getRoundedToNextHundred = (cost) => {
    const costStr = "" + cost;

    const rounded = Math.ceil(parseFloat(costStr.slice(-3)) / 100) * 100;

    return parseInt(costStr.replace(costStr.slice(-3), rounded))
};

const setCars = (trip) => {
    const { gas, toll, amount } = trip.cars;

    trip.cars = {
        ...trip.cars,
        cost: gas + toll,
        totalCost: (gas + toll) * amount
    };
}

const setFood = (trip) => {
    const { drinks, meals, other } = trip.food;

    trip.food = {
        ...trip.food,
        totalCost: drinks + meals + other
    };
}

const setHotel = (trip) => {
    const { totalCost } = trip.hotel;

    trip.hotel = {
        ...trip.hotel,
        individualCost: totalCost / trip.participants.length
    }
}

const setParticipants = (trip) => {
    const { cost, participants } = trip;

    trip.individualCost = parseInt(cost / participants.length);
}

const setTotalCost = trip => trip.cost = trip.hotel.totalCost + trip.food.totalCost + trip.cars.totalCost;

const setCosts = trip => {
    const { participants } = trip;
    if (participants.length < 1) {
        return;
    }

    const sponsored = participants.filter(participant => participant.isSponsored).length;
    const totalPayed = participants.reduce((acc, { payed }) => {
        return acc + payed
    }, 0);

    trip.publicIndividualCost = getRoundedToNextHundred(trip.individualCost);
    trip.assets = participants.length - sponsored
    trip.totalCashReceived = trip.assets * trip.publicIndividualCost;
    trip.leadToPay = sponsored * trip.individualCost;
    trip.totalCash = trip.totalCashReceived + trip.leadToPay;
    trip.surplusTotal = trip.totalCash - trip.cost;
    trip.surplus = trip.publicIndividualCost - trip.individualCost;
    trip.totalPayed = totalPayed;
    trip.totalPayedPercentage = (100 * (totalPayed / trip.cost)).toFixed(2)
}

const setTripPrices = trip => {
    setCars(trip);
    setFood(trip);
    setHotel(trip);
    setTotalCost(trip);
    setParticipants(trip);
    setCosts(trip);

    return trip;
}

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/trips', (req, res) => {
    res.send(TRIPS.map(trip => setTripPrices(trip)))
})

app.get('/participants', (req, res) => {
    res.send(trip.participants)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})