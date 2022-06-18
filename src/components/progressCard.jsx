import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import { FcLike } from "react-icons/fc";

import { formatCurrency } from "../utils.js";

import ConfirmDialog from "./confirmDialog.jsx";

const renderPayedPill = (isCompleted) => {
    if (!isCompleted) {
        return null;
    }

    return (
        <Badge pill bg="success">
            Pagado
        </Badge>
    );
};

const renderConfirmedPill = (
    hasConfirmed,
    openConfirmationModal,
    setopenConfirmationModal,
    handleSubmit
) => {
    if (hasConfirmed) {
        return (
            <Badge pill bg={"info"}>
                Confirmado
            </Badge>
        );
    }
    return (
        <ConfirmDialog
            openConfirmationModal={openConfirmationModal}
            setopenConfirmationModal={setopenConfirmationModal}
            handleSubmit={handleSubmit}
        />
    );
};

const renderLastPayment = (lastPayment) => {
    const labelText = lastPayment
        ? `Ultimo abono: ${formatCurrency(lastPayment?.amount)} el ${
              lastPayment?.date
          } en ${lastPayment?.type}`
        : "No ha dado su primer abono.";

    return <small className="text-muted">{labelText}</small>;
};

const ProgressCard = ({
    participant: { name, payed, isSponsored, logs, hasConfirmed },
    publicIndividualCost,
    shouldDisplayDetail,
    handleConfirmParticipant,
}) => {
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const handleSubmit = () => {
        handleConfirmParticipant(name);
        setOpenConfirmationModal(false);
    };

    const percentage = Math.round(
        parseFloat(100 * (payed / publicIndividualCost))
    );
    const isCompleted = payed === publicIndividualCost;
    const lastPayment = logs?.at(-1);

    const borderStyle = isCompleted
        ? "success"
        : hasConfirmed
        ? "info"
        : "warning";

    const renderDetailsBody = () => {
        return (
            <>
                <Card.Body>
                    <div>
                        {isSponsored && <FcLike className="mt-" />}
                        {` ${name}`}:
                    </div>
                    {renderPayedPill(isCompleted)}
                    {!isCompleted &&
                        renderConfirmedPill(
                            hasConfirmed,
                            openConfirmationModal,
                            setOpenConfirmationModal,
                            handleSubmit
                        )}
                    <div>
                        ${payed} / ${publicIndividualCost}
                    </div>
                    <ProgressBar
                        variant={isCompleted ? "success" : ""}
                        animated
                        label={`${percentage}%`}
                        now={payed}
                        min={0}
                        max={publicIndividualCost}
                    />
                </Card.Body>
                <Card.Footer>{renderLastPayment(lastPayment)}</Card.Footer>
            </>
        );
    };

    const renderSimpleVersion = () => {
        return (
            <>
                <Card.Body>
                    <div>{` ${name}`}:</div>
                    {renderPayedPill(isCompleted)}
                    {!isCompleted &&
                        renderConfirmedPill(
                            hasConfirmed,
                            openConfirmationModal,
                            setOpenConfirmationModal,
                            handleSubmit
                        )}
                </Card.Body>
            </>
        );
    };

    return (
        <Col xs={"auto"}>
            <Card
                border={borderStyle}
                style={{ width: shouldDisplayDetail ? "22rem" : "8rem" }}
                className="my-2 mx-2 text-center"
            >
                {shouldDisplayDetail
                    ? renderDetailsBody()
                    : renderSimpleVersion()}
            </Card>
        </Col>
    );
};

export default ProgressCard;
