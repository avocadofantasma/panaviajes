import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { getClient } from "./getClient.mjs";
import { calculateTripPrices } from "./trip.mjs";

const __filename = fileURLToPath(import.meta.url);

const app = express();
const port = process.env.PORT || 3001;

const client = await getClient();

app.use(cors());
app.use(express.json());

const getTrips = async () => {
    try {
        const trips = await client.lRange("trips", 0, -1);

        return trips.map((trip) => JSON.parse(trip));
    } catch (err) {
        console.log("error while fetching....", err);
    }
};
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/prices/:id", async (req, res) => {
    const id = req.params.id;
    await calculateTripPrices(id, client);

    res.send(await getTrips());
});

app.get("/nukeTrips", async (req, res) => {
    console.log("getting trips...");

    const trips = await client.flushAll();

    res.send(trips);
});

app.get("/trip/:id", async (req, res) => {
    const id = req.params.id;
    console.log("getting trip...", req.params.id);
    const trip = await client.lIndex(`trips`, id);
    res.send(trip);
});

app.put("/trip/:id", async (req, res) => {
    console.log("updating trip...", req.params.id);
    const id = req.params.id;
    const newTrip = req.body;
    await client.lSet("trips", id, JSON.stringify(newTrip));
    await calculateTripPrices(id, client);
    const trip = await client.lIndex(`trips`, id);
    res.send(trip);
});

app.post("/trip", async (req, res) => {
    const trip = req.body;
    const newId = await client.lLen("trips");
    trip.id = newId;
    await client.rPush("trips", JSON.stringify(trip));
    res.send(await getTrips());
});

app.get("/trips", async (req, res) => {
    console.log("getting all trips...");

    res.send(await getTrips());
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Panapp listening on port ${port}`);
});
