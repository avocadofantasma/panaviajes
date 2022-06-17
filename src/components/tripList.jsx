import React from 'react'

import { Button, ButtonToolbar } from 'rsuite';

const renderButton = (activeTrip, index, item, setActive) => {
    const getAppearance = (activeTrip, index) => activeTrip === index ? 'primary' : 'default';
    const onClickHandler = () => {
        setActive(index);
    }

    return <Button appearance={getAppearance(activeTrip, index)} key={`${item.title}-nav`} onClick={onClickHandler} block>{item.title}</Button>
}

const TripList = ({ activeTrip, items, setTrips }) => {
    const setActive = (trip) => {
        setTrips({
            items,
            activeTrip: trip
        })
    }

    return (
        <div >
            <h3 className='text-center'>Viajes disponibles:</h3>
            <ButtonToolbar className="rs-theme-dark m-2">
                {items.map((item, index) => renderButton(activeTrip, index, item, setActive))}
            </ButtonToolbar>
        </div>
    )
}

export default TripList