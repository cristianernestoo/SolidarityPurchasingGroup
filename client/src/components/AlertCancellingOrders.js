import {Modal, Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

function AlertCancellingOrders(props) {

  const handleClose = () => {
      props.setNotificationFlag(1);
  }


    return (
        <Modal {...props} centered>
                <>
              <Modal.Header className="justify-content-center" style={{backgroundColor: "#f8d7da"}} >
                <Modal.Title>
                  <b className="mr-1 text-center"> Attention! </b>   Status of orders: CANCELLING!
                </Modal.Title>
                  </Modal.Header>
                  <small className="text-center">Remember to go to the shop and top up your wallet!
                    <br/>Otherwise your orders will be cancelled at 08:00 pm </small>

                  <Modal.Body >
                  <Row className="mt-1">
                      <Col xs={12}>
                          <h6 className="text-center mt-1">Balance</h6>
                          <h3 className="text-center">€ {props.currentClient.amount}</h3>
                      </Col>
                  </Row>

                  {props.cancelOrders ?
                  <Row>
                      <Col xs={12}>
                        <h6 className="mt-3">Orders marked as <strong>CANCELLING:</strong></h6>
                          {
                       props.cancelOrders.map((o) => (
                          <Row key={o.id}>
                            <Col xs={3} >
                              <strong>ID: {o.id}</strong>
                            </Col>
                            <Col xs={5} >
                            <strong> DATE: </strong>{o.creation_date}
                            </Col>
                            <Col xs={4} >
                            <strong>TOTAL: </strong> € {o.total.toFixed(2)}
                            </Col>
                          </Row>
                        ))
                       }
                      </Col>
                  </Row>
                  : ""}
                  </Modal.Body>
              <Modal.Footer style={{backgroundColor: "#f8d7da"}} >
                  <Link to={{ pathname: '/products'}}>
                      <Button data-testid="button-close" variant="danger" onClick={handleClose}>Close</Button>
                  </Link>
              </Modal.Footer>
                </>
        </Modal>

    )

}
  
export default AlertCancellingOrders;
  