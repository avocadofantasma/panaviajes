
import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Badge } from 'react-bootstrap'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PriceTag from './priceTag';

import 'react-circular-progressbar/dist/styles.css';

const TotalCost = ({ cost, publicIndividualCost, totalPayed, totalPayedPercentage, title, type }) => {
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
        }
    ];

    return (
        <Card
            text={'dark'}
        >
            <Card.Title className='mx-auto p-2 text-center'>
                <div>
                    {title}
                </div>
                <Badge pill bg="primary">
                    {type}
                </Badge>
            </Card.Title>
            <Card.Body>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <div className='mx-auto w-60' >
                                <CircularProgressbar {...progressProps} />
                            </div>
                        </Col>
                        <Col sm={7} className='d-flex flex-wrap '>
                            {labels.map((label) => <PriceTag {...label} key={`${label.label}-${label.value}`}/>)}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default TotalCost
