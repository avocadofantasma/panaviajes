import React from 'react'
import { Modal, Button, ButtonToolbar } from 'rsuite';
import RemindFillIcon from '@rsuite/icons/RemindFill';

const ConfirmDialog = ({ openConfirmationModal, setopenConfirmationModal, handleSubmit }) => {
    const handleOpen = () => setopenConfirmationModal(true);
    const handleClose = () => setopenConfirmationModal(false);

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button size="sm" color="yellow" appearance="primary" onClick={handleOpen}>Confirmar</Button>
            </ButtonToolbar>

            <Modal backdrop="static" role="alertdialog" open={openConfirmationModal} onClose={handleClose} size="xs">
                <Modal.Body>
                    <div className='text-center'>

                        <RemindFillIcon
                            style={{
                                color: '#ffb300',
                                fontSize: 24
                            }}
                        />
                    </div>
                    Confirmar significa que vas a cubrir tu parte para el costo total. Confirmar y no cubrir tu parte significa baneo inmediato para futuros viajes.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmDialog