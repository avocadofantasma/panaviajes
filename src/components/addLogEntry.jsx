import React, { useState } from "react";

import { Button } from "rsuite";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";

import { AutoComplete } from "rsuite";

const now = new Date();
const getNowDate = () => new Date(now.getTime() + now.getTimezoneOffset());
const options = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Transferencia", label: "Transferencia" },
    { value: "Tarjeta", label: "Tarjeta" },
];

const AddLogEntry = ({ name, handleSubmitLogEntry }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        amount: 0,
        type: options[0].value,
        date: getNowDate(),
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setForm({
            amount: 0,
            type: options[0].value,
            date: getNowDate(),
        });
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.target.disabled = true;
        debugger;
        handleSubmitLogEntry(name, form);

        handleClose();
    };

    const handleInputChange = ({ target }) => {
        setForm({
            ...form,
            date: getNowDate(),
            [target.name]: target.value,
        });
    };

    const handleSelectChange = (type, value) => {
        const target = {
            name: type,
            value: value,
        };
        handleInputChange({ target });
    };
    return (
        <div className="modal-container m-3">
            <Button size="md" appearance="primary" onClick={handleOpen}>
                Abonar
            </Button>

            <Modal show={open} onHide={handleClose}>
                <Modal.Body>
                    <Form>
                        <fieldset>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="name">nombre</Form.Label>
                                <Form.Control
                                    disabled
                                    id="name"
                                    name="name"
                                    placeholder={`${name}`}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="amount">Abono</Form.Label>
                                <Form.Control
                                    id="amount"
                                    name="amount"
                                    placeholder="$..."
                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="type">
                                    Método de pago
                                </Form.Label>
                                <Select
                                    defaultValue={options[0]}
                                    name="type"
                                    options={options}
                                    onChange={({ value }) =>
                                        handleSelectChange("type", value)
                                    }
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

export default AddLogEntry;
