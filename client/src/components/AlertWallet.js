import { Modal, Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import {MdDoneOutline} from "react-icons/md";
import { useState} from 'react';
import { Link } from "react-router-dom";
import API from '../API';

function AlertWallet(props) {

  const [done, setDone] = useState(false);
  const [showLaterModal, setShowLaterModal] = useState(false);
  const handleClose = () => {
    setShowLaterModal(false);
    window.location.reload();
}
  const updateWallet = async () => {
    await API.updateWallet(parseInt(props.topUp) + parseInt(props.user.amount ? props.user.amount : props.currentClient.amount), props.user.id ? props.user.id : props.currentClient.id);
      if(props.user.amount){
        props.user.amount = parseInt(props.topUp)+parseInt(props.user.amount);
      } else props.currentClient.amount = parseInt(props.topUp)+parseInt(props.currentClient.amount);
      setDone(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        props.setAlertWalletShow(false); 
        setDone(false);
        props.setTopUp(0);
        window.location.reload();
      }, 3000);
  }
    return (
      <>
       <Modal centered show={showLaterModal} onHide={handleClose}>
         {showLaterModal ?
        <Modal.Body style={{backgroundColor: "#fff3cd"}}>
          <Alert variant="warning">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Order Issued!
              </Alert.Heading>
              <p>
                Remember to top up to confirm the order!
              </p>
          </Alert>
          <Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Body> : ''}
        </Modal>
      <Modal {...props} centered>
        {done ? 
        <Modal.Body style={{backgroundColor: "#d4edda"}}>
          <Alert show={done} variant="success">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Top Up Success
              </Alert.Heading>
              <p>
                Your top up has been successfully done.<br/> You will recieve a notification when your order is ready.
              </p>
          </Alert>
        </Modal.Body>
          : 
      (props.userRole === "shopemployee" ? <>
      <Modal.Header  style={{backgroundColor: "#fff3cd"}} className="justify-content-center">
        <Modal.Title>
          <b className="mr-1">Warning! </b>Better top up your wallet!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Container>
          <Row>
              <Col xs={12}>
                  <h5 className="text-center">{props.user.name ? props.user.name : props.currentClient.name} {props.user.surname ? props.user.surname : props.currentClient.surname}</h5>
                  <h6 className="text-center">{props.user.email ? props.user.email : props.currentClient.email}</h6>
              </Col>
          </Row>
          <Row className="mt-1">
              <Col xs={12} >
                  <h6 className="text-center mt-1">Balance</h6>
                  <h3 className="text-center">€ {props.user.amount ? props.user.amount : props.currentClient.amount}</h3>
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
                type="number"
                value={props.increment}
                min="0"
                data-testid = "boxTopUp"
                onChange = {(event) => {props.setTopUp(event.target.value)}} />
            </Col>
          </Form.Group>

          <Row className="justify-content-center">
              <Button 
                className="text-center mt-5"
                variant="success"
                disabled={props.topUp <= 0}
                onClick={updateWallet}>
                  Top up now
              </Button>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor: "#fff3cd"}}>
          <Link to={{ pathname: '/products'}}>
              <Button variant="warning" onClick={()=>{setShowLaterModal(true)}}>Top up later</Button>
          </Link>
      </Modal.Footer>
      </> : <Modal.Body style={{backgroundColor: "#fff3cd"}}>
          <Alert variant="warning">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Order Issued!
              </Alert.Heading>
              <p>
                Remember to top up to confirm the order!
              </p>
          </Alert>
          <Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Body> )}
      </Modal>
      </>
    );
  }
  
export default AlertWallet;
  