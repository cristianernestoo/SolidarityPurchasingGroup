import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import { useState} from 'react';
import {MdDoneOutline} from "react-icons/md";
import API from '../API';

function Wallet(props) {
  const [done, setDone] = useState(false);

  const updateWallet = () => {
    API.updateWallet(parseInt(props.increment) + parseInt(props.user.amount), props.user.id).then(() => {
      props.user.amount = parseInt(props.increment) + parseInt(props.user.amount);
      setDone(true);
      if(props.user.amount > props.amountCancellingOrders){
        console.log(props.user.id);
        API.deleteNotification(props.user.id).then(()=> console.log("deleted notification"))
      }
      setTimeout(() => {
        // After 3 seconds set the done false 
        props.setWalletShow(false); 
        setDone(false);
        props.setIncrement(0);
      }, 3000)
    }).catch((err) => console.log(err));
  }

    return (
      <Modal {...props} centered data-testid="modal_test">
        {done ? 
        <Modal.Body style={{backgroundColor: "#d4edda"}}>
          <Alert show={done} variant="success">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Top Up Success
              </Alert.Heading>
              <p>
                Your top up has been successfully done. 
              </p>
          </Alert>
        </Modal.Body>
          : 
      <>
        <Modal.Header  style={{backgroundColor: "#b4e6e2"}} className="justify-content-center">
          <Modal.Title>
            Your wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
                <Col xs={12}>
                    <h5 className="text-center">{props.user.name} {props.user.surname}</h5>
                    <h6 className="text-center">{props.user.email}</h6>
                </Col> 
            </Row>
            <Row className="mt-1">
                <Col xs={12} >
                    <h6 className="text-center mt-1">Balance</h6>
                    <h3 className="text-center">€ {typeof props.user.amount == 'number' ? props.user.amount.toFixed(2) : props.user.amount}</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                  <h6 className="mt-3">Set amount</h6>
                  <small className="ml-1">How much would you like to top up?</small>
                </Col>
            </Row>
            <Form.Group as={Row} className="mb-3 mt-2" controlId="formPlaintextPassword">
              <Form.Label column xs={1} md={1} className="ml-3">€</Form.Label>
              <Col xs={5} md={5}>
                <Form.Control 
                  data-testid="formControl"
                  type="number"
                  value={props.increment}
                  min="0"
                  onChange = {(event) => {props.setIncrement(event.target.value)}} />
              </Col>
            </Form.Group>

            <Row className="justify-content-center">
                <Button 
                data-testid="button-top-up"
                  className="text-center mt-5"
                  variant="success"
                  disabled={props.increment <= 0}
                  onClick={updateWallet}>
                    Top up now
                </Button>
            </Row>
          </Container> 
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#b4e6e2"}}>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </>}
      </Modal>
    );
  }
  
export default Wallet;
  