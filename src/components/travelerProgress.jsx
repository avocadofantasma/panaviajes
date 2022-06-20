import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import { Toggle, Button, ButtonToolbar } from "rsuite";
import ProgressCard from "./progressCard";
import ParticipantModal from "./participantdrawer";

import { updateTrip } from "../requests";

const renderProgressCard = (
    participant,
    publicIndividualCost,
    shouldDisplayDetail,
    handleConfirmParticipant,
    id,
    index
) => {
    const props = {
        participant,
        publicIndividualCost,
        shouldDisplayDetail,
        handleConfirmParticipant,
    };

    return (
        <ProgressCard
            {...props}
            key={`${participant.name}-trip-${id}-${index}-progress-card`}
        />
    );
};

const renderParticipants = (
    { participants, publicIndividualCost, id },
    shouldDisplayDetail,
    handleConfirmParticipant
) => {
    const emptyMarkup = (
        <h4 className="text-muted text-center m-4">
            No hay participantes aún.
        </h4>
    );
    return participants.length > 0
        ? participants.map((participant, i) =>
              renderProgressCard(
                  participant,
                  publicIndividualCost,
                  shouldDisplayDetail,
                  handleConfirmParticipant,
                  id,
                  i
              )
          )
        : emptyMarkup;
};

const renderToggle = (
    shouldDisplayDetail,
    setShouldDisplayDetail,
    participants
) =>
    participants.length > 0 && (
        <div className="mx-2 p-2">
            <Toggle
                size="lg"
                checked={shouldDisplayDetail}
                checkedChildren="Ocultar"
                unCheckedChildren="Ver detalle"
                onChange={setShouldDisplayDetail}
            />
        </div>
    );

const confirmParticipant = async (trip, name) => {
    const index = trip?.participants.findIndex(
        (participant) => participant.name === name
    );
    trip.participants[index].hasConfirmed = true;
    const { data } = await updateTrip(trip);

    return data;
};

function TravelerProgress({ trip, setTrip }) {
    const [shouldDisplayDetail, setShouldDisplayDetail] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [formValue, setFormValuex] = useState({
        name: "",
        hasConfirmed: "",
    });

    const handleConfirmParticipant = async (name) => {
        const newTrip = await confirmParticipant(trip, name);
        setTrip(newTrip);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        event.target.disabled = true;

        trip?.participants?.push({
            ...formValue,
            isSponsored: false,
            payed: 0,
            logs: [],
        });

        const { data } = await updateTrip(trip);

        setTrip(data);

        handleClose();
    };
    const onFormChange = ({ name, checkboxInput }) => {
        const hasConfirmed = checkboxInput?.target?.checked;
        setFormValuex({
            name,
            hasConfirmed,
        });
    };

    const modalProps = {
        open,
        handleClose,
        formValue,
        onFormChange,
        onSubmit,
    };

    return (
        <div className="my-4">
            <ButtonToolbar className="text-center rs-theme-dark">
                <Button
                    className="rs-theme-dark"
                    appearance="primary"
                    size="lg"
                    onClick={() => setOpen(true)}
                >
                    Quiero ir
                </Button>
            </ButtonToolbar>
            <ParticipantModal {...modalProps} />
            {renderToggle(
                shouldDisplayDetail,
                setShouldDisplayDetail,
                trip.participants
            )}
            <Row className="justify-content-center">
                {renderParticipants(
                    trip,
                    shouldDisplayDetail,
                    handleConfirmParticipant
                )}
            </Row>
        </div>
    );
}

export default TravelerProgress;
