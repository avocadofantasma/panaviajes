
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
const setMovieTotalCost = trip => trip.cost = trip.publicIndividualCost * trip.participants.length;

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
    if (trip.type === 'movie') {
        setMovieTotalCost(trip);
    } else {
        setCars(trip);
        setFood(trip);
        setHotel(trip);
        setTotalCost(trip);
        setParticipants(trip);
        setCosts(trip);
    }

    trip.initialized = true;

    return trip;
}

export const calculateTripPrices = async id => {
    console.log('calculating costs...', id);

    const trip = setTripPrices(JSON.parse(await client.lIndex(`trips`, id)))
    await client.lSet('trips', id, JSON.stringify(trip));
}
