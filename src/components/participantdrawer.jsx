import React from "react";

import { Modal, Checkbox, Button, Form, Schema } from "rsuite";

const ParticipantModal = ({
    open,
    handleClose,
    formValue,
    onFormChange,
    onSubmit,
}) => {
    const nameRule = Schema.Types.StringType().isRequired(
        "This field is required."
    );

    return (
        <div className="p-2">
            <Modal open={open} onClose={handleClose} size="xs">
                <Modal.Header>
                    <Modal.Title>¿Quién bergas eres?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={onFormChange} formValue={formValue}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>
                                Nombre, apodo o fetiche
                            </Form.ControlLabel>
                            <Form.Control name="name" rule={nameRule} />
                            <Form.HelpText>
                                Si no sé quién eres... ¿Cómo vasir?
                            </Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="hasConfirmed">
                            <Form.ControlLabel></Form.ControlLabel>
                            <Form.Control
                                name="checkboxInput"
                                accepter={"checkboxGroup"}
                                inline
                            >
                                <Checkbox value={"checkvalue"}>
                                    {formValue.name &&
                                        `¡Hey, ${formValue.name}!`}{" "}
                                    ¿Confirmas?
                                </Checkbox>
                            </Form.Control>
                            <Form.HelpText>
                                Puedes confirmar después. Quedar mal despues de
                                confirmar significa baneo automatico.
                            </Form.HelpText>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onSubmit} appearance="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ParticipantModal;
