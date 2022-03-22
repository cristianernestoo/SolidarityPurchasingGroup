import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import { useState, useEffect} from 'react';
import {MdDoneOutline} from "react-icons/md";
import dayjs from 'dayjs';
import API from '../API';

function OrderModal(props) {

  const {selectedOrder, setModalShow, setDirty, date, setDate, time, setTime} = props;  
  const [basket, setBasket] = useState([]);
  const [done, setDone] = useState(false);
  
  const updateOrder = () => {
    console.log(date + ' ' + time);
    API.changeDateTime(selectedOrder.id, date, time).then(() => {
      
      setDone(true);
      setDirty(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        setModalShow(false); 
        setDone(false);
        setDate('');
        setTime('');
      }, 3000)
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if(selectedOrder){
      API.getReportBasket(selectedOrder.id).then((products) => {
        setBasket(products);
      })
    }
}, [selectedOrder]);

    return (
      <Modal {...props}  centered data-testid="order-modal" >
        {done ? 
        <Modal.Body style={{backgroundColor: "#d4edda"}}>
          <Alert show={done} variant="success">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Order Modified!
              </Alert.Heading>
              <p>
                Your Order has been successfully modified. 
              </p>
          </Alert>
        </Modal.Body>
          : 
      <>
        <Modal.Header  style={{backgroundColor: "#b4e6e2"}} className="justify-content-center">
          <Modal.Title>
            Order {selectedOrder.id} - {selectedOrder.client_name} {selectedOrder.client_surname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Container>            
            <Row className="mt-1">
                <Col xs={12} >
                    <h6 className="text-center mt-1">Products:</h6>
                    {/* fetched from basket table in db */}
                </Col>
            </Row>
                {
                  basket.map((p) => (
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
                  ))
                }
            <Row className="mt-3">
                <Col xs={6}>
                  <h6>Select pick-up date</h6>
                </Col>
                <Col xs={6}>
                <Form.Control
                    data-testid='date-picker'
                    type="date" 
                    placeholder="date" 
                    value={date} 
                    onChange={(event) => {setDate(event.target.value);}}
                    min={dayjs().add(1, "w").day(3).format("YYYY-MM-DD")}
                    max={dayjs().add(1, "w").day(5).format("YYYY-MM-DD")} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={6}>
                  <h6 >Select pick-up time</h6>
                </Col>
                <Col xs={6}>
                <Form.Control 
                    data-testid='time-picker'
                    type="time" 
                    placeholder="time" 
                    value={time}
                    min="09:00"
                    max="21:00"
                    onChange={(event) => {setTime(event.target.value);}} />
                </Col>
            </Row>
            <Row className="justify-content-end">
                <small>Please, pick a time between 09:00 and 21:00</small>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#b4e6e2"}}>
          <Col className="text-left">
          <Button data-testid="button-close"  variant='danger'onClick={props.onHide}>
              Close
          </Button>
          </Col>
          <Col className="text-right" >
          <Button data-testid="button-confirm" variant="success" disabled={((date === '') || (time === '')||(time<"09:00")||(time>"21:00"))} onClick={updateOrder}>
              Confirm
         </Button>
         </Col>
        </Modal.Footer>
        </>}
      </Modal>
    );
  }
  
export default OrderModal;