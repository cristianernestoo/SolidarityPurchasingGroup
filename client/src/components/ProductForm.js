import { Form, Container, Col, Row, Modal} from 'react-bootstrap';
import { useState } from 'react';
import API from '../API';
import { Product } from '../Product';




function ProductForm(props) {
	const {userid, show, handleShow, handlePopUpShow} = props;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');
	const [img_path, setImgPath] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;


		if (form.checkValidity() === false) {
				event.stopPropagation();

		} else {
				API.createProduct(new Product(0, name, description, category, quantity, price, userid, img_path, 0));
		}
		
		setValidated(true);
		handleShow();
		handlePopUpShow();
	}


	return (
		<>
			<Modal centered show={show} onHide={handleShow} {...props}>
				<Modal.Header closeButton>
					<Modal.Title>
						Add new product
					</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Body>
						<Container fluid>
							<Row>
								<Form.Group
									as={Col}
									lg={6}
									md={6}
									sm={12}
									controlId="name"
									className="position-relative"
								>
									<Form.Label>Name of product</Form.Label>
									<Form.Control
										required
										data-testid="nameofproduct"
										type="text"
										placeholder="Product"
										value={name}
										onChange={(event) => setName(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert name of product.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group
									as={Col}
									lg={6}
									md={6}
									sm={12}
									controlId="price"
									className="position-relative"
								>
									<Form.Label>Price of product</Form.Label>
									<Form.Control
										required
										data-testid="priceofproduct"
										type="number"
										placeholder="Price"
										value={price}
										step="0.01"
										onChange={(event) => setPrice(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert a valid price.
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									lg={12}
									md={12}
									sm={12}
									controlId="description"
									className="position-relative"
								>
									<Form.Label>Description of product</Form.Label>
									<Form.Control
										required
										as="textarea"
										data-testid="descriptionofproduct"
										placeholder="Description of new product..."
										value={description}
										onChange={(event) => setDescription(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert description of product.
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									lg={6}
									md={6}
									sm={12}
									controlId="quantity"
									className="position-relative"
								>
									<Form.Label>Initial quantity</Form.Label>
									<Form.Control
										required
										data-testid="quantityofproduct"
										type="number"
										placeholder="Quantity"
										value={quantity}
										onChange={(event) => setQuantity(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert a valid quantity.
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group
									as={Col}
									lg={6}
									md={6}
									sm={12}
									controlId="category"
									className="position-relative"
								>
									<Form.Label>Category</Form.Label>
										<Form.Control
											required
											as="select"
											data-testid="categoryofproduct"
											value={category}
											onChange={(event) => setCategory(event.target.value)}
										>
											<option default value="Dairies">Dairies</option>
											<option value="Fruits">Fruits</option>
											<option value="Vegetables">Vegetables</option>
											<option value="Plants">Plants</option>
											<option value="Fish">Fish</option>
											<option value="Meat">Meat</option>
										</Form.Control>
									<Form.Control.Feedback type="invalid">
										Please insert a valid quantity.
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									lg={6}
									md={6}
									sm={12}
									controlId="img"
									className="position-relative"
								>
									<Form.Label>Image Path of Product</Form.Label>
									<Form.Control
										required
										data-testid="imgofproduct"
										type="text"
										placeholder="https:// ...."
										value={img_path}
										onChange={(event) => setImgPath(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert image path of product.
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Row align='center'>
							<Col>
								<div className='farmer-card-button'>
									<button data-testid="add-new-product" style={{fontWeight:"bold"}} type="submit">
										Add product
									</button>
								</div>
							</Col>
						</Row>
					</Modal.Footer>
				</Form>
			</Modal>
			
		</>

    );
}
export default ProductForm;