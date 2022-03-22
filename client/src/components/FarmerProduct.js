import React, { useState } from 'react';
import{ Container, Row, Col, Modal, Form, Alert, Button} from "react-bootstrap";
import FarmerCard from '../components/FarmerCard/FarmerCard';
import API from '../API';



function FarmerProduct(props) {
  const {id, name, description, category, quantity, price, img_path, confirmed} = props.product;
	const initialSwitch = confirmed ? true : false;
	const [show, setShow] = useState(false);
	const switched = initialSwitch;
	const [disabled, setDisabled] = useState(true);
	const [nameProduct, setNameProduct] = useState(name);
	const [descriptionProduct, setDescriptionProduct] = useState(description);
	const [categoryProduct, setCategoryProduct] = useState(category);
	const [priceProduct, setPriceProduct] = useState(price);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const categories = ["Dairies", "Fruits", "Vegetables", "Plants", "Fish", "Meat"];

	const handleChange = () => {setDisabled(false)};
	const handleConfirm = () => {
        const changedProduct= {
            id: id,
            name: nameProduct,
            description: descriptionProduct,
            category: categoryProduct,
            quantity: quantity,
            price: priceProduct,
            img_path: img_path,
            confirmed: switched ? "1" : "0"
        }
				API.updateConfirmedProduct( changedProduct.confirmed, id);
				window.location.reload();

	}
	const handleDeleteAlert = () => {setShowConfirmation(true)};
	const onHide = () => {setShowConfirmation(false)};

	const handleDelete = () => {
		API.deleteProduct(id);
		onHide();
		handleClose();
		window.location.reload();

	}

	return (
		<>
			<Container data-testid="container-form" onClick={handleShow} {...props}>
				<FarmerCard confirmed={confirmed} title={name} body={description} img={img_path} subinfo={price} ></FarmerCard>
			</Container>
			<Modal centered show={show} onHide={handleClose}>
					<Form >
							<Modal.Header closeButton>
							<Modal.Title>
									<Form.Group controlId="formGroupEmail">
											<Form.Label>Name of product</Form.Label>
											<Form.Control
													type="text"
													data-testid="nameofproduct"
													defaultValue={name}
													placeholder={name}
													onChange={(event) => {setNameProduct(event.target.value); handleChange();}}
													/>
									</Form.Group>
							</Modal.Title>
							</Modal.Header>
							<Modal.Body>
									<Container fluid>
											<Row>
													<Col xs={12} md={6}>
															<img src={img_path} alt={name} className="img-fluid" style={{height:"10rem", width:"10rem"}}/>
													</Col>

													<Col xs={6} md={6}>
															<h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Description</h3>
															<p style={{margin: "0", padding: "0"}}>
																	<Form.Control
																			as="textarea"
																			rows={3}
																			defaultValue={description}
																			placeholder={description}
																			data-testid="description"
																			onChange={(event) => {setDescriptionProduct(event.target.value); handleChange();}}
																			/>
															</p>
															<h3 style={{color: "#247D37", marginTop:"1rem", marginBottom:"1rem", fontSize: "1.3rem"}}>Category</h3>
															<p style={{margin: "0", padding: "0"}}>
																	<Form.Control
																			as="select"
																			value={category}
																			data-testid="category"
																			onChange={(event) => { setCategoryProduct(event.target.value); handleChange()}}
																	>
																			<option default>{category}</option>
																			{categories.map(cat => cat != category ?
																			<option key={cat} value={cat}>{cat} </option>
																			: "" )}
																	</Form.Control>
															</p>
													</Col>
											</Row>
											<hr className='solid'/>
											<Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
													<Col xs={6} md={6}>
															<h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>Price</h3>
													</Col>
											</Row>
											<Row align="center" style={{marginTop:"1rem", marginBottom:"1.2rem"}}>
													<Col xs={6} md={6}>
															<Form.Control
																	type="text"
																	defaultValue={price}
																	placeholder={price}
																	data-testid="price"
																	onChange={(event) => {setPriceProduct(event.target.value); handleChange();}}
																	/>
													</Col>
											</Row>
									</Container>
							</Modal.Body>
							<Modal.Footer>
									<Row>
											<Col xs={12} md={6}>
													<div className='farmer-card-button align-left'>
															<input data-testid="delete-product" type='button' class='btn' style={{backgroundColor:"#dc3545", fontWeight:"bold"}} onClick={handleDeleteAlert} value="Delete"/>
													</div>
											</Col>
											<Col xs={12} md={6}>
													<div className='farmer-card-button align-left'>
														<button data-testid="edit-product" disabled={false} style={{fontWeight:"bold"}} onClick={() => {handleConfirm(); handleClose();}}>
															Confirm changes
														</button>
													</div>
											</Col>
									</Row>
							</Modal.Footer>
					</Form>
			</Modal>
			<Modal
							centered
							show={showConfirmation}
							onHide={onHide}
							size='sm'
					>
						<Modal.Header closeButton />

						<Modal.Body style={{backgroundColor: "#fff3cd"}}>
						<Alert variant="warning">
								<Alert.Heading className="mt-2">
									Confirmation
								</Alert.Heading>
								<p>
									Are you sure you want to delete this product?
								</p>
						</Alert>
					</Modal.Body>
					<Modal.Footer>
						<Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"left"}} onClick={onHide}>
								Close
							</Button>
							<Button data-testid="delete-confirmed" style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} onClick={handleDelete}>
								Confirm
						</Button>
					</Modal.Footer>
				</Modal>
		</>

	);
}

export default FarmerProduct;