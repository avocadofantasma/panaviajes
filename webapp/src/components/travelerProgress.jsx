import React from 'react'
import ProgressCard from './progressCard';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const renderProgressCard = (participant, publicIndividualCost) => {
    const props = { participant, publicIndividualCost };

    return (
        <ProgressCard {...props} />
    )
}

const TravelerProgress = ({ participants, publicIndividualCost }) => {
    return (
        <Container >
            <Row className="justify-content-center">
                {participants && participants.map(participant => renderProgressCard(participant, publicIndividualCost))}
            </Row>
        </Container>
    )
}

export default TravelerProgress