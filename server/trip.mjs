const getRoundedToNextHundred = (cost) => {
    const costStr = "" + cost;

    const rounded = Math.ceil(parseFloat(costStr.slice(-3)) / 100) * 100;

    return parseInt(costStr.replace(costStr.slice(-3), rounded));
};

const setCars = (trip) => {
    const { cars } = trip;
    if (!cars) {
        return;
    }
    const { gas, toll, amount } = trip.cars;

    trip.cars = {
        ...trip.cars,
        cost: ((gas + toll) * amount) / trip.participants.length,
        totalCost: (gas + toll) * amount,
    };
};

const setFood = (trip) => {
    const { food } = trip;
    if (!food) {
        return;
    }
    const { drinks, meals, other } = trip.food;

    trip.food = {
        ...trip.food,
        totalCost: drinks + meals + other,
    };
};

const setHotel = (trip) => {
    const { isPriceFixed, hotel, publicIndividualCost, flight, participants } =
        trip;

    if (!hotel) {
        return;
    }

    const { totalCost } = hotel;

    if (isPriceFixed) {
        trip.hotel = {
            individualCost: publicIndividualCost - (flight?.cost || 0),
            totalCost:
                (publicIndividualCost - (flight?.cost || 0)) *
                participants.length,
        };
    } else {
        trip.hotel = {
            ...trip.hotel,
            individualCost: totalCost / trip.participants.length,
        };
    }
};

const setFlight = (trip) => {
    const { flight, participants } = trip;

    trip.flight = {
        ...flight,
        totalCost: participants.length * flight.cost,
    };
};

const setParticipants = (trip) => {
    const { cost, participants } = trip;

    trip.participants.forEach((participant) => {
        participant.payed = participant.logs.reduce((prev, curr) => {
            return parseInt(curr.amount) + prev;
        }, 0);
    });

    trip.individualCost = parseInt(cost / participants.length) || 0;
};

const setTotalCost = (trip) =>
    (trip.cost =
        trip.hotel.totalCost + trip.food.totalCost + trip.cars.totalCost);
const setFixedPriceTotalCost = (trip) =>
    (trip.cost = trip.publicIndividualCost * trip.participants.length);

const setCosts = (trip) => {
    const { participants } = trip;
    if (participants.length < 1) {
        return;
    }

    const sponsored = participants.filter(
        (participant) => participant.isSponsored
    ).length;
    const totalPayed = participants.reduce((acc, { payed }) => {
        return acc + payed;
    }, 0);

    trip.assets = participants.length - sponsored;
    trip.totalCashReceived = trip.assets * trip.publicIndividualCost;
    trip.leadToPay = sponsored * trip.individualCost;
    trip.totalCash = trip.totalCashReceived + trip.leadToPay;
    trip.surplusTotal = trip.totalCash - trip.cost;
    trip.surplus = trip.publicIndividualCost - trip.individualCost;
    trip.totalPayed = totalPayed;
    trip.totalPayedPercentage = (100 * (totalPayed / trip.cost)).toFixed(2);
};

const setTripPrices = (trip) => {
    setParticipants(trip);
    trip.initialized = true;

    if (trip.isPriceFixed) {
        setFixedPriceTotalCost(trip);
    } else {
        setTotalCost(trip);
        trip.publicIndividualCost = getRoundedToNextHundred(
            trip.individualCost
        );
    }
    if (trip.type !== "movie") {
        setCosts(trip);
        setCars(trip);
        setFood(trip);
        setHotel(trip);
    }
    if (trip.type === "flight") {
        setFlight(trip);
    }

    return trip;
};

export const calculateTripPrices = async (id, client) => {
    console.log("calculating costs...", id);

    const trip = setTripPrices(JSON.parse(await client.lIndex(`trips`, id)));
    await client.lSet("trips", id, JSON.stringify(trip));
};
