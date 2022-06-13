import React from 'react'
import Card from 'react-bootstrap/Card'

const TravelerSummary = ({ participants, publicIndividualCost }) => {
    return (
        <Card
            bg={'primary'}
            text={'light'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Title>Costo por persona: ${publicIndividualCost}</Card.Title>

            <Card.Body>Cuantos panas vamos? {participants.length}</Card.Body>
        </Card>
    )
}

export default TravelerSummary