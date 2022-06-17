const express = require('express')
const cors = require('cors')
const path = require('path');
const redis = require("redis");

const app = express()
const port = process.env.PORT || 3001;


const client = process.env.REDIS_URL ? redis.createClient({ url: process.env.REDIS_URL }) : redis.createClient();
client.connect().then(data => {
    console.log('connected to redis herokus: ', data)
}).catch(err => console.log('not connected: ', err));
client.ping().then(ping => console.log('ping: ', ping))

const getRoundedToNextHundred = (cost) => {
    const costStr = "" + cost;

    const rounded = Math.ceil(parseFloat(costStr.slice(-3)) / 100) * 100;

    return parseInt(costStr.replace(costStr.slice(-3), rounded))
};

const setCars = (trip) => {
    const { gas, toll, amount } = trip.cars;

    trip.cars = {
        ...trip.cars,
        cost: ((gas + toll) * amount) / trip.participants.length,
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

    trip.individualCost = parseInt(cost / participants.length) || 0;
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
    trip.initialized = true;

    return trip;
}

app.use(cors())
app.use(express.json())

const getTrips = async () => {
    try {
        const trips = await client.lRange('trips', 0, -1);

        return (trips.map(trip => JSON.parse(trip)))
    } catch (err) {
        console.log('error while fetching....', err)
    }

}

const calculateTripPrices = async id => {
    console.log('calculating costs...', id);

    const trip = setTripPrices(JSON.parse(await client.lIndex(`trips`, id)))
    await client.lSet('trips', id, JSON.stringify(trip));
}


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/prices/:id', async (req, res) => {
    const id = req.params.id;
    await calculateTripPrices(id)

    res.send(await getTrips())
});

app.get('/nukeTrips', async (req, res) => {
    console.log('getting trips...');

    const trips = await client.flushAll();

    res.send(trips)
})

app.get('/trip/:id', async (req, res) => {
    const id = req.params.id;
    console.log('getting trip...', req.params.id);
    const trip = await client.lIndex(`trips`, id)
    res.send(trip)
})

app.put('/trip/:id', async (req, res) => {
    console.log('updating trip...', req.params.id);
    const id = req.params.id;
    const newTrip = req.body;
    await client.lSet('trips', id, JSON.stringify(newTrip))
    await calculateTripPrices(id);

    res.send(await getTrips())
})

app.post('/trip', async (req, res) => {
    const trip = req.body;
    const newId = await client.lLen('trips');
    trip.id = newId;
    await client.rPush("trips", JSON.stringify(trip));
    res.send(getTrips())
})

app.get('/trips', async (req, res) => {
    console.log('getting trips...');

    res.send(await getTrips())
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Example app listening on port ${port}`)
})