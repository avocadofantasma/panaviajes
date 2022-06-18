import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const getTrips = async () => {
    try {
        return await axios.get(`/trips`);
    } catch (error) {
        console.error(error);
    }
};

export const createTrip = (trip, setTrips) => {
    axios
        .post(`/trip`, trip)
        .then(({ data }) => {
            setTrips({
                items: data,
                activeTrip: data[data.length - 1].id,
            });
        })
        .catch((err) => console.error(err));
};

export const updateTrip = async (trip) => {
    return await axios.put(`/trip/${trip.id}`, trip);
};

export const getTrip = async (id) => {
    return await axios.get(`/trip/${id}`).data;
};

export const deleteAllTrips = async () => {
    return await axios.get(`/nukeTrips`).data;
};

export const calculateTripPrices = async (id, setTrips) => {
    return await axios.get(`/prices/${id}`).data;
};
