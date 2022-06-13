import React from 'react'

import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import { FcLike } from "react-icons/fc";

import { formatCurrency } from '../utils.js';

const renderPayedPill = (isCompleted) => {
    if (!isCompleted) {
        return null;
    }

    return (
        <Badge pill bg="success">
            Pagado
        </Badge>
    )
}

const renderLastPayment = (lastPayment) => {
    const labelText = lastPayment ? `Ultimo abono: ${formatCurrency(lastPayment?.amount)} el ${lastPayment?.date} en ${lastPayment?.type}` : 'No ha dado su primner abono.';

    return (
        <small className="text-muted" >{labelText}</small >
    )
}

const ProgressCard = ({ participant: { name, payed, isSponsored, logs }, publicIndividualCost }) => {
    const percentage = Math.round(parseFloat(100 * (payed / publicIndividualCost)))
    const isCompleted = payed === publicIndividualCost;
    const lastPayment = logs.at(-1);

    return (
        <Col xs={"auto"}>
            <Card
                border={isCompleted ? "success" : ""}
                style={{ width: '22rem' }}
                className="my-2 mx-2"
            >
                <Card.Body>
                    <div>
                        {isSponsored && <FcLike className='mt-' />}
                        {` ${name}`}:
                    </div>
                    {renderPayedPill(isCompleted)}
                    <div>
                        ${payed}/ ${publicIndividualCost}
                    </div>
                    <ProgressBar variant={isCompleted ? "success" : ""} animated label={`${percentage}%`} now={payed} min={0} max={publicIndividualCost} />
                </Card.Body>
                <Card.Footer>
                    {renderLastPayment(lastPayment)}
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ProgressCard