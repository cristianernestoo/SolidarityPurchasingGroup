import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Modal, Alert, Button } from "react-bootstrap";
import SideBar from './SideBar';
import FarmerProduct from './FarmerProduct';
import API from '../API';
import { FaCalendarAlt} from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImSad } from "react-icons/im";
import ProductForm from './ProductForm';
import { BsFillPlusCircleFill } from "react-icons/bs";

function FarmerInterface(props) {
    const { products, userid } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('All');
    const [filter, setFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentFarmer, setCurrentFarmer] = useState('');
    const [show, setShow] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        if (userid) {
            API.getUserInfo(userid).then((user) => {
                setCurrentFarmer(user.name + ' ' + user.surname);
            });
        }
        console.log(currentFarmer);

    }, [currentFarmer, userid]);


    const searchCategory = (c) => {
        setCategory(c);

    };
    const handlePopUpShow = () => {setShowPopUp(true)};

    useEffect(() => {
        if (category === "All") {
            setFilter(false);

        } else {
            var filtered = products.filter((el) =>
                el.category === category);
            setFilteredProducts(filtered);
            setFilter(true);
        }


    }, [category, products])

    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        if (size < 1000) {
            setCollapsed(true);
        }
        if (size >= 1000) {
            setCollapsed(false);
        }
    }, [size])

    const handleShow = () => { setShow(!show); };

    return (
        <>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0, maxWidth: "100%", overflowX: "hidden" }} {...props}>

                <Row style={{ minHeight: "45rem" }}>
                    <Col xs={2} sm={2} md={2}>
                        <div className={`app `}>

                            <SideBar
                                collapsed={collapsed}
                                width="13rem"
                                searchCategory={(cat) => searchCategory(cat)}
                                userRole="farmer"
                            //client= {props.location.state}
                            />
                        </div>

                    </Col>
                    <Col xs={10} sm={10} md={10}>
                        <Container style={{ marginTop: "0.5rem" }}>
                            <Row align='center'>
                                <Col>
                                    <h3 style={{ fontSize: '35px', color: '#1d1d1d' }}> Welcome, {currentFarmer}! </h3>
                                </Col>
                            </Row>
                            <hr style={{ marginTop: 0 }} />
                            <Row align='center' >

                                <Col xs={12} sm={12} md={6} >
                                    <Link to={{ pathname: '/farmerPlanning' }}>
                                        <div className="farmer-button">
                                            <button disabled={products.length == 0  ? true : false}>
                                                <FaCalendarAlt /> Plan for next week
                                            </button>
                                        </div>
                                    </Link>
                                </Col>

                                <Col xs={12} sm={12} md={6}>
                                    <Link to={{ pathname: '/farmerOrders' }}>
                                        <div className="farmer-button">
                                            <button data-testid="view-orders-button">
                                                <AiOutlineShoppingCart size={30} /> View your orders
                                            </button>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                            <hr />
                        </Container>
                        <Container fluid style={{ marginTop: "2rem" }}>
                            <Row >
                                {filter ?
                                    filteredProducts.map(product =>
                                        <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                            <FarmerProduct product={product} />
                                        </Col>
                                    )
                                    :
                                    products.map(product =>
                                        <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                            <FarmerProduct product={product} />
                                        </Col>
                                    )}
                            </Row>
                            <Row align='center'>
                                {products.length == 0 ?
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <h3 style={{ fontSize: "2.5rem", margin: "4", padding: "0", color: "#247D37" }}>
                                            There are no products yet <ImSad />
                                        </h3>
                                    </Col>
                                    :
                                    ''
                                }
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <div className="fixed">
                    <BsFillPlusCircleFill className="pointer" size={40} color="#28a745" onClick={handleShow}></BsFillPlusCircleFill>
                </div>
            </Container>             
            <ProductForm userid={userid} show={show} handleShow={handleShow} handlePopUpShow={handlePopUpShow} />
            <Modal
            centered
            show={showPopUp}
            onHide={() => {window.location.reload()}}
            size='sm' {...props}
        	>
					<Modal.Header closeButton />
					<Modal.Body style={{backgroundColor: "#fff3cd"}}>
					<Alert variant="success">
							<Alert.Heading className="mt-2">
								Success
							</Alert.Heading>
							<p>
								The products was inserted 
							</p>
					</Alert>
				</Modal.Body>
				<Modal.Footer>
					<Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"left"}} onClick={() => {window.location.reload()}}>
							Close
						</Button>
				</Modal.Footer>
			</Modal>
        </>

    );
}



export default FarmerInterface;

