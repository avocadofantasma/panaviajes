# To run the project

-   nstall dependencies

```
npm i
```

-   install redis-cli
    Open three terminals:

1. Run `redis-server` to start the database
2. `nodemon server/serverj.mjs` to run the server
3. `npm run dev` to run the app locally

if no trip is showing up run this post request to create an empty trip
i use this extension to create request:

REST Client
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

```
POST http://localhost:3001/trip HTTP/1.1
content-type: application/json

{
    "title": "Cancún 2023",
    "type": "Playa",
    "subtitle": "Ida a la playa",
    "initialized": false,
    "isTravel": true,
    "publicIndividualCost": 0,
    "assets": 0,
    "totalCashReceived": 0,
    "leadToPay": 0,
    "totalCash": 0,
    "surplusTotal": 0,
    "surplus": 0,
    "totalPayed": 0,
    "totalPayedPercentage": 0,
    "cars": {
        "amount": 3,
        "gas": 500,
        "toll": 400
    },
    "food": {
        "meals": 3000,
        "drinks": 2000,
        "other": 500
    },
    "hotel": {
        "totalCost": 12000
    },
    "originDestination": {
        "origin": "Casa de Paola",
        "destination": "cancun",
        "departureDate": "12/01/23",
        "departureTime": "9:00 am",
        "returnDate": "15/01/23"
    },
    "participants": [

    ]
}
```
