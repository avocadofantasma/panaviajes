import React from 'react'
import ProgressCard from './progressCard';
import Row from 'react-bootstrap/Row'

const renderProgressCard = (participant, publicIndividualCost) => {
    const props = { participant, publicIndividualCost };

    return (
        <ProgressCard {...props} key={participant.name + "progress-card"}/>
    )
}

const TravelerProgress = ({ participants, publicIndividualCost }) => {
    return (
        <div >
            <Row className="justify-content-center">
                {participants && participants.map(participant => renderProgressCard(participant, publicIndividualCost))}
            </Row>
        </div>
    )
}

export default TravelerProgress