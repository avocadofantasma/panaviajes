import React from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const renderHotelPrice = ({ totalCost, individualCost }) => {
    return (
        <Card
            bg={'info'}
            text={'light'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Title>Costo total del hospedaje: ${totalCost}</Card.Title>
            <Card.Body>Costo por persona: ${individualCost}</Card.Body>
        </Card>
    )
}

const renderCarsPrice = ({ amount, gas, toll, cost, totalCost }) => {
    return (
        <Card
            bg={'info'}
            text={'light'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Title>Costo total del transporte: ${totalCost}</Card.Title>
            <Card.Body>
                Costo de gasolina estimado por carro: ${gas}
                Costo de casetas por carro: ${toll}
                Numero de vehiculos: ${amount}
                Costo por persona: ${cost}
            </Card.Body>
        </Card>
    )
}

const renderFoodPrice = ({ meals, drinks, other, totalCost }) => {
    return (
        <Card
            bg={'info'}
            text={'light'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Title>Costo total de los insumos: ${totalCost}</Card.Title>
            <Card.Body>
                Costo de comida para todos: ${meals}
                Costo de bebidas para todos: ${drinks}
                costo de despensa en general: ${other}
            </Card.Body>
        </Card>
    )
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