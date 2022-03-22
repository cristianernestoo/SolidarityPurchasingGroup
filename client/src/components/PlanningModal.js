
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useState } from "react";
import API from '../API';




function PlanningModal(props) {
    const { show, ...rest } = props;

    const updateProductNW = (quantity) => {
        const up = async () => {
            await API.changeProductNW(props.id, quantity);
            props.setDirty(true);
            props.onHide();

        };
        up();
    }



    return (
        <Modal
            show={show}
            onHide={rest.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.update ? "Update" : "Add Product"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPlanning onHide={rest.onHide} products={rest.products} userid={rest.userid} id={props.id} update={props.update} updateProductNW={updateProductNW} productNW={props.productNW} farmerProducts={props.farmerProducts} />
            </Modal.Body>


        </Modal>
    );
}


function FormPlanning(props) {
    const [id, setId] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [path, setPath] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;


        if (form.checkValidity() === false) {
            event.stopPropagation();

        } else if (!props.update) {


             API.createProductNW(({id: id, quantity: quantity, price: price, name: product, description: description, category: category, farmer_id: props.userid, img_path: path, confirmed_by_farmer: 0 })).then(props.onHide);


        } else {
            props.updateProductNW(quantity);

        }

        setValidated(true);

    }

    console.log(id);

    return (
        <>
            {props.update ?

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="d-flex justify-content-center ">
                        {props.productNW.filter(f => f.id == props.id)
                            .map(r =>
                                <h3 key={r.id} className="mr-5">{r.id_product} </h3>
                            )}
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Form.Group as={Col} sm={5} className="mt-5" controlId="quantity" variant="outlined">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    data-testid='quantity'
                                    required
                                    type="text"
                                    placeholder="0.0"
                                    value={quantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please insert a quantity.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col >
                    </Row>

                    <Row className="pb-4 mb-4 ml-4 pl-4">
                        <Col xs={5} sm={6} className="d-flex justify-content-start align-items-center">
                            <Button className="mt-5" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={props.onHide}>Close</Button>
                        </Col>

                        <Col xs={4} sm={5} className="d-flex justify-content-end align-items-center">
                            <Button className="mt-5" data-testid="submit-Button" variant="success" type="submit" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>submit</Button>
                        </Col>
                        <Col></Col>

                    </Row>
                </Form>


                :

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row className=" justify-content-center">
                        <Form.Group as={Col} sm={5} controlId="Product">
                            <Form.Label className="mr-3">Product</Form.Label>
                            <Form.Control
                                data-testid="formControl"
                                required
                                as="select"
                                value={product}
                                onChange={(event) => {
                                    setId(props.farmerProducts.filter(r => r.name == event.target.value)[0].id);
                                    setProduct(event.target.value);
                                    setPrice(props.farmerProducts.filter(r => r.name == event.target.value)[0].price);
                                    setCategory(props.farmerProducts.filter(r => r.name == event.target.value)[0].category);
                                    setDescription(props.farmerProducts.filter(r => r.name == event.target.value)[0].description);
                                    setPath(props.farmerProducts.filter(r => r.name == event.target.value)[0].img_path)
                                }}
                            >
                                <option></option>
                                {props.farmerProducts.filter(f => f.confirmed == 1)
                                    .map((r) => (
                                      
                                        <option>{r.name}</option>))}

                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose a product.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="d-flex justify-content-center">
                            <Form.Group as={Col} sm={5} className="mt-5" controlId="quantity" variant="outlined">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    required
                                    data-testid='quantity'
                                    type="text"
                                    placeholder="0.0"
                                    value={quantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please insert a quantity.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col >
                        <Col className="d-flex justify-content-center">
                            <Form.Group as={Col} sm={5} className="mt-5" controlId="price" variant="outlined">
                                <Form.Label>Price €</Form.Label>
                                <Form.Control
                                    disabled
                                    required
                                    type="text"
                                    placeholder={price}
                                    value={price}


                                />
                                <Form.Control.Feedback type="invalid">
                                    Please insert a price.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Row>


                    <Row className="pb-4 mb-4 ml-4 pl-4">
                        <Col xs={5} sm={6} className="d-flex justify-content-start align-items-center">
                            <Button className="mt-5" data-testid="close-Button" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={props.onHide}>Close</Button>
                        </Col>

                        <Col xs={4} sm={5} className="d-flex justify-content-end align-items-center">
                            <Button className="mt-5" data-testid="submit-Button" variant="success" type="submit" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>submit</Button>
                        </Col>
                        <Col></Col>

                    </Row>

                </Form>
            }


        </>



    );

}

export default PlanningModal;
export { FormPlanning };