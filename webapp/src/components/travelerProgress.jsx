import React, { useState } from 'react'
import ProgressCard from './progressCard';
import Row from 'react-bootstrap/Row'
import { Toggle } from 'rsuite';

const renderProgressCard = (participant, publicIndividualCost, shouldDisplayDetail) => {
    const props = { participant, publicIndividualCost, shouldDisplayDetail };

    return (
        <ProgressCard {...props} key={participant.name + "progress-card"} />
    )
}

const renderParticipants = ({ participants, publicIndividualCost }, shouldDisplayDetail) => {
    const emptyMarkup = <h4 className='text-muted text-center m-4'>No hay participantes aún.</h4>;
    return participants.length > 0 ? participants.map(participant => renderProgressCard(participant, publicIndividualCost, shouldDisplayDetail)) : emptyMarkup;
}

const renderToggle = (shouldDisplayDetail, setShouldDisplayDetail, participants ) => {
    return participants.length > 0 && (
        <div className="mx-2 p-2">
            <Toggle size="lg" checked={shouldDisplayDetail} checkedChildren="Ocultar" unCheckedChildren="Ver detalle" onChange={setShouldDisplayDetail} />
        </div>
    )
}

const TravelerProgress = (trip) => {
    const [shouldDisplayDetail, setShouldDisplayDetail] = useState(false);

    return (
        <div >
            {renderToggle(shouldDisplayDetail, setShouldDisplayDetail, trip.participants)}
            <Row className="justify-content-center">
                {renderParticipants(trip, shouldDisplayDetail)}
            </Row>
        </div>
    )
}

export default TravelerProgress