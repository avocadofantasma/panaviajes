import React from 'react'
import { formatCurrency } from '../utils';

const PriceTag = ({ label, value, isMoney = true }) => {
    return (
        <div key={value + "label"} className='p-2 d-flex justify-content-between w-100'>
            <div className='text-muted'>{label}:</div>
            <div>{isMoney ? formatCurrency(value) : value}</div>
        </div>
    )
}

export default PriceTag