import React, { useState } from 'react';
import{Button, Modal} from "react-bootstrap";


function DetailProduct(props) {
    const {name, description} = props.product;
    const [isOpen, setOpen] = useState(props.isOpen);

	return (
        <>
            <Modal show={isOpen} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
            <Modal.Title data-testid="modalTitle">{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body data-testid="modalDescription">{description}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" data-testid="btnclose" onClick={() => setOpen(false)}>
                Close
            </Button>
            <Button variant="primary" data-testid="btnSave" onClick={() => setOpen(false)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        </>
		
       
	);
}

export default DetailProduct;