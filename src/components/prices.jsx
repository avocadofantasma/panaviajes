import React from "react";

import CardGroup from "react-bootstrap/CardGroup";

import PriceCard from "./priceCard";

const renderPrice = (props) => {
    return <PriceCard {...props} />;
};

const renderHotelPrice = ({ totalCost, individualCost }) => {
    const title = "Hospedaje";
    const tags = [
        {
            label: "Costo total del hospedaje",
            value: totalCost,
        },
        {
            label: "Costo por persona",
            value: individualCost,
        },
    ];

    return renderPrice({ title, tags });
};

const renderCarsPrice = ({ amount, gas, toll, cost, totalCost }) => {
    const title = "Transporte";

    const tags = [
        {
            label: "Costo total del transporte",
            value: totalCost,
        },
        {
            label: "Costo de gasolina estimado por carro",
            value: gas,
        },
        {
            label: "Costo de casetas por carro",
            value: toll,
        },
        {
            label: "Numero de vehiculos",
            isStr: true,
            value: amount,
        },
        {
            label: "Costo por persona",
            value: cost,
        },
    ];

    return renderPrice({ title, tags });
};

const renderFoodPrice = ({ meals, drinks, other, totalCost }) => {
    const title = "Comida y bebida";
    const tags = [
        {
            label: "Costo total de los insumos",
            value: totalCost,
        },
        {
            label: "Costo de comida para todos",
            value: meals,
        },
        {
            label: "Costo de bebidas para todos",
            value: drinks,
        },
        {
            label: "costo de despensa en general",
            value: other,
        },
    ];

    return renderPrice({ title, tags });
};

const renderFlightPrice = ({
    cost,
    type,
    departureDate,
    returnDate,
    totalCost,
}) => {
    const title = "Detalles del vuelo";
    const tags = [
        {
            label: "Costo del vuelo por persona",
            value: cost,
        },
        {
            label: "Costo total de los vuelos",
            value: totalCost,
        },
        {
            label: "Tipo de vuelo",
            value: type === "rt" ? "redondo" : "sencillo",
            isStr: true,
        },
        {
            label: "Salida",
            value: departureDate,
            isStr: true,
        },
        {
            label: "Regreso",
            value: returnDate,
            isStr: true,
        },
    ];

    return renderPrice({ title, tags });
};

const Prices = ({ publicIndividualCost, hotel, food, cars, flight, type }) => {
    return (
        <CardGroup>
            {hotel && renderHotelPrice(hotel)}
            {cars && renderCarsPrice(cars)}
            {food && renderFoodPrice(food)}
            {flight && renderFlightPrice(flight)}
        </CardGroup>
    );
};

export default Prices;
