import React from 'react'

import CardGroup from 'react-bootstrap/CardGroup'

import PriceCard from './priceCard';

const renderPrice = (props) => {
    return (
        <PriceCard {...props} />
    )
}

const renderHotelPrice = ({ totalCost, individualCost }) => {
    const title = 'Hospedaje';
    const tags = [
        {
            label: "Costo total del hospedaje",
            value: totalCost
        },
        {
            label: "Costo por persona",
            value: individualCost
        },
    ];

    return renderPrice({ title, tags })
}

const renderCarsPrice = ({ amount, gas, toll, cost, totalCost }) => {
    const title = 'Transporte';

    const tags = [
        {
            label: "Costo total del transporte",
            value: totalCost
        },
        {
            label: "Costo de gasolina estimado por carro",
            value: gas
        },
        {
            label: "Costo de casetas por carro",
            value: toll
        },
        {
            label: "Numero de vehiculos",
            value: amount
        },
        {
            label: "Costo por persona",
            value: cost
        },
    ];

    return renderPrice({ title, tags })

}

const renderFoodPrice = ({ meals, drinks, other, totalCost }) => {
    const title = 'Comida y bebida';
    const tags = [
        {
            label: "Costo total de los insumos",
            value: totalCost
        },
        {
            label: "Costo de comida para todos",
            value: meals
        },
        {
            label: "Costo de bebidas para todos",
            value: drinks
        },
        {
            label: "costo de despensa en general",
            value: other
        },
    ];

    return renderPrice({ title, tags })
}

const Prices = ({ publicIndividualCost, hotel, food, cars }) => {
    return (
        <CardGroup>
            {hotel && renderHotelPrice(hotel)}
            {cars && renderCarsPrice(cars)}
            {food && renderFoodPrice(food)}
        </CardGroup>
    )
}

export default Prices