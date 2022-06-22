import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import { Toggle, Button, ButtonToolbar } from "rsuite";
import ProgressCard from "./progressCard";
import ParticipantModal from "./participantdrawer";

import { updateTrip } from "../requests";
import AddParticipants from "./addParticipants";
import AddLogEntry from "./addLogEntry";

function TravelerProgress({ trip, setTrip, isAdmin }) {
    const [shouldDisplayDetail, setShouldDisplayDetail] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [formValue, setFormValuex] = useState({
        name: "",
        hasConfirmed: "",
    });

    const addLogEntry = async (trip, name, log) => {
        const index = trip?.participants.findIndex(
            (participant) => participant.name === name
        );
        debugger;
        trip.participants[index].logs.push(log);
        const { data } = await updateTrip(trip);

        return data;
    };

    const confirmParticipant = async (trip, name) => {
        const index = trip?.participants.findIndex(
            (participant) => participant.name === name
        );
        trip.participants[index].hasConfirmed = true;
        const { data } = await updateTrip(trip);

        return data;
    };

    const handleConfirmParticipant = async (name) => {
        const newTrip = await confirmParticipant(trip, name);
        setTrip(newTrip);
    };

    const handleSubmitLogEntry = async (name, log) => {
        const newTrip = await addLogEntry(trip, name, log);
        setTrip(newTrip);
    };

    const renderProgressCard = (
        participant,
        publicIndividualCost,
        id,
        index
    ) => {
        const props = {
            participant,
            publicIndividualCost,
            shouldDisplayDetail,
            handleConfirmParticipant,
            handleSubmitLogEntry,
            isAdmin,
        };

        return (
            <ProgressCard
                {...props}
                key={`${participant.name}-trip-${id}-${index}-progress-card`}
            />
        );
    };

    const renderParticipants = () => {
        const { participants, publicIndividualCost, id } = trip;

        const emptyMarkup = (
            <h4 className="text-muted text-center m-4">
                No hay participantes aún.
            </h4>
        );

        return participants.length > 0
            ? participants.map((participant, i) =>
                  renderProgressCard(participant, publicIndividualCost, id, i)
              )
            : emptyMarkup;
    };

    const renderToggle = () => {
        const { participants } = trip;

        return (
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
            )
        );
    };

    const renderAddButton = () => {
        if (isAdmin) {
            return <AddParticipants trip={trip} setTrip={setTrip} />;
        } else
            return (
                <Button
                    className="rs-theme-dark"
                    appearance="primary"
                    size="lg"
                    onClick={() => setOpen(true)}
                >
                    Quiero ir
                </Button>
            );
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
                {renderAddButton()}
            </ButtonToolbar>
            <ParticipantModal {...modalProps} />
            {renderToggle()}
            <Row className="justify-content-center">{renderParticipants()}</Row>
        </div>
    );
}

export default TravelerProgress;
