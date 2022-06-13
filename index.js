const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001


const PARTICIPANTS = require('./participants.json');
const EXPENSES = require('./expenses.json');

const trip = {
    participants: PARTICIPANTS,
    ...EXPENSES
};

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
    const { participants = [] } = trip;
    const sponsored = participants.filter(participant => participant.isSponsored).length;
    const totalPayed = participants.reduce((acc, { payed }) => {
        return acc + payed
    }, 0)


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

const createNewTrip = trip => {
    setCars(trip);
    setFood(trip);
    setHotel(trip);

    setTotalCost(trip);

    setParticipants(trip);
    setCosts(trip);
}

createNewTrip(trip);

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/trip', (req, res) => {
    res.send(trip)
})

app.get('/participants', (req, res) => {
    res.send(PARTICIPANTS)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})