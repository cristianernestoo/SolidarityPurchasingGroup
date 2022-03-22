import { useState, useEffect } from "react";
import { Container, Table, Badge, Modal, ModalBody, Row, Col, Button, Form } from "react-bootstrap";
import { pickUpIcon, deliveryIcon } from "./Icons";
import API from "../API";




function WarehouseManagerPage(props) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(''); //current order selected for top up
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [basket, setBasket] = useState([]);


    useEffect(() => {
        if (selectedOrder) {
            API.getBasket(selectedOrder.id).then((products) => {
                console.log(products);
                setBasket(products);
            })
        }
    }, [selectedOrder]);







    return (
        <>
            <Container fluid className="page width-100 below-nav table" >
                <OrderTable orders={props.orders} setSelectedOrder={setSelectedOrder} setModalShow={setModalShow} setDate={setDate} setTime={setTime} />
                <OrderModal
                    show={modalShow}
                    setModalShow={setModalShow}
                    date={date}
                    time={time}
                    onHide={() => { setModalShow(false); setDate(''); setTime('') }}
                    selectedOrder={selectedOrder}
                    basket={basket}

                />
            </Container>
        </>

    );

}


function OrderTable(props) {
    const { setSelectedOrder, setModalShow, setDate, setTime } = props;



    const handleClick = (o) => {
        setModalShow(true);
        setSelectedOrder(o);
        setDate(o.date);
        setTime(o.time);
    }

    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Creation Date</th>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Client Surname</th>
                    <th>Total</th>
                    <th>Deliver Type</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.orders.filter(f => f.status == "ACCEPTED").map((o) => (
                        <tr key={o.id} data-testid={`tr-${o.id}`}>
                            <td onClick={() => { handleClick(o) }} >{o.id}</td>
                            <td onClick={() => { handleClick(o) }} >{o.creation_date}</td>
                            <td onClick={() => { handleClick(o) }} >{o.client_id}</td>
                            <td onClick={() => { handleClick(o) }} >{o.client_name}</td>
                            <td onClick={() => { handleClick(o) }} >{o.client_surname}</td>
                            <td onClick={() => { handleClick(o) }}  ><strong>€ {o.total.toFixed(2)}</strong></td>
                            {o.pick_up ? <td onClick={() => { handleClick(o) }} > {pickUpIcon} Pick-Up  </td> : <td onClick={() => { handleClick(o) }} > {deliveryIcon} Delivery </td>}
                            <td onClick={() => { handleClick(o) }}>{o.address}</td>
                            <td onClick={() => { handleClick(o) }}>{o.date }</td>
                            <td onClick={() => { handleClick(o) }}>{o.time }</td>
                            <td className="text-center">
                                <Badge bg="success">CONFIRMED</Badge>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}


function OrderModal(props) {
 
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered data-testid="order-modal"
            >
            <Modal.Header style={{ backgroundColor: "#b4e6e2" }} className="justify-content-center">
                <Modal.Title>
                    Order {props.selectedOrder.id} - {props.selectedOrder.client_name} {props.selectedOrder.client_surname}
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Container>
                    <Row className="mt-1">
                        <Col xs={12} >
                            <h6 className="text-center mt-1">Product:</h6>
                            {/* fetched from basket table in db */}
                        </Col>
                    </Row>
                    {props.basket?
                        props.basket.map((p) => (
                            <Row key={p.id}>
                                <Col xs={2} >
                                    <strong>ID: {p.id}</strong>
                                </Col>
                                <Col xs={5} >
                                    {p.name}
                                </Col>
                                <Col xs={3} >
                                    € {p.price}
                                </Col>
                                <Col xs={2} >
                                    x {p.quantity}
                                </Col>
                            </Row>
                        )) : <span></span>
                    }
                    <Row className="mt-3">
                        <Col xs={6}>
                            <h6> Pick-up date</h6>
                        </Col>
                        <Col xs={6}>
                            <Form.Control
                                disabled
                                data-testid='date-picker'
                                type="text"
                                placeholder="date"
                                value={props.date}

                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}>
                            <h6 > Pick-up time</h6>
                        </Col>
                        <Col xs={6}>
                            <Form.Control
                                disabled
                                data-testid='time-picker'
                                type="time"
                                placeholder="time"
                                value={props.time}/>
                        </Col>
                    </Row>
                </Container>

            </ModalBody>
            <Modal.Footer style={{ backgroundColor: "#b4e6e2" }}>
                <Col className="text-left">
                    <Button data-testid="button-close-order-modal" variant='danger' onClick={props.onHide}>
                        Close
                    </Button>
                </Col>
            </Modal.Footer>



        </Modal>

    );

}


export default WarehouseManagerPage;
export {OrderModal, OrderTable};
