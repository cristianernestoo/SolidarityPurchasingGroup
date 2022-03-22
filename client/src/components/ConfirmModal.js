import { Modal, Button, Row, Card, Col } from 'react-bootstrap';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import API from '../API';





function ConfirmModal(props) {
  const { show, ...rest } = props;

  const deleteUpdateProduct = () => {
  


    const up = async () => {
        let farmer_id = props.userid;
        API.changeProductNWConfirm( farmer_id).then(props.onHide);
        props.setDirty(true);
        props.setShowPopUp(true);
    }

   
  up();
  
    
  }




  return (
    <>

      <Modal
        show={show}
        onHide={rest.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title><BsFillExclamationTriangleFill className="mb-2" fill="red" /> This Action is irreversible!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
          <Row className="justify-content-start align-items-center mb-2">
            {/*<BsFillExclamationTriangleFill fill="yellow" />  Are you sure? This action is irreversible !*/}
            <h3 style={{ color: "green" }}>Summary : </h3>
          </Row>
          <Row className="justify-content-start align-items-center mb-2">
            <CardRiepilogo productNW={props.productNW} products={props.products} userid={props.userid} farmerProducts={props.farmerProducts} />
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button data-testid="close1" variant="secondary" onClick={props.onHide} >
            Close
          </Button>
          <Button data-testid='list_product' style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'red' }} onClick={deleteUpdateProduct} >
            List Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CardRiepilogo(props) {


  return (
    <>
      {
        props.productNW.map(t =>
          props.farmerProducts.filter(f => f.name == t.name )
            .map(w =>
              <Col key={w.id} data-testid='col'className="d-flex justify-content-center">
                <Card style={{ width: '20rem' }} className="mt-3">
                  <Card.Img className="center" variant="top" src={w.img_path} style={{ height: "80px", width: "80px" }} />
                  <Card.Body>
                    <h5>Product: {t.name}</h5>
                    <h5>Quantity: {t.quantity}</h5>
                    <h5>Price: {t.price}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
    </>

  );
}

export default ConfirmModal;
export {CardRiepilogo};