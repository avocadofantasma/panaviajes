import React, { useState } from "react";

import { Modal, Button, ButtonToolbar } from "rsuite";
import Form from "react-bootstrap/Form";
import { updateTrip } from "../requests";

const AddParticipants = ({ trip, setTrip }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        names: "",
        hasConfirmed: false,
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.target.disabled = true;

        trip.participants = trip?.participants?.concat(
            form.names
                .trim()
                .split(",")
                .map((name) => {
                    return {
                        name,
                        hasConfirmed: form.hasConfirmed,
                        isSponsored: false,
                        payed: 0,
                        logs: [],
                    };
                })
        );

        const { data } = await updateTrip(trip);

        setTrip(data);

        handleClose();
    };

    const handleToggle = ({ target }) => {
        setForm({
            ...form,
            hasConfirmed: target.checked,
        });
    };

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            names: target.value,
        });
    };

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button size="md" appearance="primary" onClick={handleOpen}>
                    Añadir participantes
                </Button>
            </ButtonToolbar>

            <Modal
                backdrop="static"
                role="alertdialog"
                open={open}
                onClose={handleClose}
                size="xs"
            >
                <Modal.Body>
                    <Form>
                        <fieldset>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="names">
                                    nombres separados por coma
                                </Form.Label>
                                <Form.Control
                                    id="names"
                                    name="names"
                                    placeholder="nombres separados por coma"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    onChange={handleToggle}
                                    name={"confirmed"}
                                    label="Confirmados?"
                                />
                            </Form.Group>
                        </fieldset>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddParticipants;
