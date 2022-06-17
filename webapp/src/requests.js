import axios from "axios";

const URL = `${window.location.origin.replace('3000', '3001')}`;

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getTrips = async () => {
    try {
        return await axios.get(`${URL}/trips`)
    } catch (error) {
        console.error(error)
    }
}

export const createTrip = (trip, setTrips) => {
    axios.post(`${URL}/trip`, trip).then(({ data }) => {
        setTrips({
            items: data,
            activeTrip: data[data.length - 1].id
        });
    }).catch(
        err => console.error(err)
    )
}

export const updateTrip = async trip => {
    return await axios.put(`${URL}/trip/${trip.id}`, trip)
}

export const getTrip = async id => {
    return await axios.get(`${URL}/trip/${id}`).data
}

export const deleteAllTrips = async () => {
    return await axios.get(`${URL}/nukeTrips`).data
}

export const calculateTripPrices = async (id, setTrips) => {
    return await axios.get(`${URL}/prices/${id}`).data
}

