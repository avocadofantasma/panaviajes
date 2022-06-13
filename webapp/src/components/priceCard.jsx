import React from 'react'

import Card from 'react-bootstrap/Card'

import PriceTag from './priceTag';

const PriceCard = ({ title, tags, isMoney}) => {
    return (
        <Card
            text={'dark'}
            style={{ width: '18rem' }}
        >
            <Card.Body>
                <h4 className="p-2 d-flex">
                    {title}:
                </h4>
                {tags.map(tag => <PriceTag {...tag} isMoney={isMoney}/>)}
            </Card.Body>
        </Card>
    )
}
export default PriceCard