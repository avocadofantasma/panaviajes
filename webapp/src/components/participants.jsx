import React from 'react'
import Table from 'react-bootstrap/Table';

const renderRow = ({ name, payed }, i, publicIndividualCost) => {
    return (
        <tr key={name + i}>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{payed}</td>
            <td>{publicIndividualCost - payed}</td>
        </tr>
    )
}

const Participants = ({ participants, publicIndividualCost }) => {
    return (
        <div>
            <Table responsive="sm" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pana</th>
                        <th>Abonado</th>
                        <th>Debe</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        participants && participants.map((pana, i) => renderRow(pana, i, publicIndividualCost))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Participants