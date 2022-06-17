import React from 'react'

import Card from 'react-bootstrap/Card'

import PriceTag from './priceTag';

const PriceCard = ({ title, tags}) => {
    return (
        <Card
            text={'dark'}
        >
            <Card.Body>
                <h4 className="p-2 d-flex">
                    {title}:
                </h4>
                {tags.map(tag => <PriceTag {...tag} key={`${tag.label}-${tag.value}`}/>)}
            </Card.Body>
        </Card>
    )
}
export default PriceCard