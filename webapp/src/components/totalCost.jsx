
import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import { formatCurrency } from '../utils';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TotalCost = ({ cost, participants, publicIndividualCost, totalPayed, totalPayedPercentage }) => {

    const progressProps = {
        circleRatio: .75,
        styles: buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            textSize: '20px',
            pathTransitionDuration: 0.5,
            trailColor: '#eee',
            backgroundColor: '#3e98c7',
        }),
        value: totalPayed,
        maxValue: cost,
        text: `${totalPayedPercentage}% `
    };

    const labels = [
        {
            label: 'Costo total del viaje',
            value: cost
        },
        {
            label: 'Abonado actual',
            value: totalPayed
        },
        {
            label: 'Faltante',
            value: cost - totalPayed
        },
        {
            label: 'Costo por persona',
            value: publicIndividualCost
        },
        {
            label: 'Numero de panas',
            value: participants.length
        },
    ];

    const renderLabel = ({ label, value }) => {
        return (
            <div key={value + "label"} className='p-2 d-flex justify-content-between w-100'>
                <div className='text-muted'>{label}:</div>
                <div>{formatCurrency(value)}</div>
            </div>
        )
    }

    return (
        <Card
            text={'dark'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Title></Card.Title>
            <Card.Body>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <div style={{ width: 200, height: 200 }}>
                                <CircularProgressbar {...progressProps} />
                            </div>
                        </Col>
                        <Col sm={7} className='d-flex flex-wrap '>
                            {labels.map((label) => renderLabel(label))}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default TotalCost
