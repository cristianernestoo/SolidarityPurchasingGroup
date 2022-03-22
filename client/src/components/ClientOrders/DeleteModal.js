import { Modal, Row, Col, Button} from 'react-bootstrap';
import {iconDanger} from "../Icons";
import { useState} from 'react';
import {MdDoneOutline} from "react-icons/md";
import API from '../../API';

function DeleteModal(props) {

  const {order_id, setModalShow, clientOrders, basket /* setBasket */ /* setDirty */} = props;  
  const [done, setDone] = useState(false);
  
  const deleteOrder = () => {
    //delete order and its basket 
    API.deleteOrder(order_id).then(() => {
        basket.map((product) => {
            const productBasket = {
                product_id: product.id,
                diffQuantity: (- product.startingQuantity)
            };
            //update availability of the deleted basket products in db
            API.changeQuantity(productBasket.product_id, productBasket.diffQuantity).then((res) => {
                    if (!res) {
                        console.log("Error inserting basket in db.");
                    }                          
                    return res;
                })
        })
      setDone(true);
      setTimeout(() => {
        // After 3 seconds set the done false 
        setModalShow(false); 
        setDone(false);
        clientOrders.filter((o)=>o.id !== order_id);
        window.location.reload();
      }, 3000)
    }).catch((err) => console.log(err));
  };

    return (
      <Modal {...props} backdrop="static" keyboard={false}  centered data-testid="order-modal" >
        {done ? 
            <Modal.Body id="succesModal" style={{ backgroundColor: "#d4edda", height: "10rem", borderRadius:"5px"}}>
                
                <h3><MdDoneOutline size={30} className="mr-3" /> Order Cancelled!</h3>
                <p className="mt-3">
                    Your Order has been successfully cancelled.
                </p>
            </Modal.Body>
          : 
      <>
        <Modal.Header  style={{borderColor: "#dedede"}} className="justify-content-center">
          <Modal.Title>
            <Row className="justify-content-center mb-3">{iconDanger}</Row>
            <Row className="text-center">By confirming you are going to cancel this order.</Row>
            <Row className="justify-content-center"><strong>Are you sure?</strong></Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{borderColor: "#dedede"}}>
          <Col className="text-left">
          <Button data-testid="undoButton"  variant='secondary'onClick={props.onHide}>
              Undo
          </Button>
          </Col>
          <Col className="text-right" >
          <Button data-testid="confirmButton" variant="danger" onClick={deleteOrder}>
              Confirm
         </Button>
         </Col>
        </Modal.Footer>
        </>}
      </Modal>
    );
}
  
export default DeleteModal;