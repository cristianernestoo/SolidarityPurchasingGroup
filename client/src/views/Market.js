import React, { useState, useLayoutEffect, useEffect } from 'react';
import{ Container, Row, Col, Modal, Alert, Button } from "react-bootstrap";
import Product from '../components/Product';
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from '../components/SideBar';
import Basket from '../components/Basket';
import AlertWallet from '../components/AlertWallet';
import PropTypes from 'prop-types';
import {MdDoneOutline} from "react-icons/md";
import {BsClockHistory} from "react-icons/bs";
import AlertCancellingOrders from '../components/AlertCancellingOrders';

function Market(props) {
    const { products, client, userRole, currentClient, clock} = props;
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('All');
    const [filter, setFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [basket, setBasket] = useState([]); //total of products ordered by a client
    const [showBasket, setShowBasket] = useState(false);
    const [show, setShow] = useState(false); //show order confirmation modal
    const [alertWalletShow, setAlertWalletShow] = useState(false); //state if the wallet is insufficient
    const [topUp, setTopUp] = useState(0); //how much to top up

    const handleBasket = () => {setCollapsed((s) => !s); setShowBasket((s) => !s)};
    const handleClose = () => {
        setShow(false);
        window.location.reload();
    }
    
    const searchCategory = (c) => {
        setCategory(c);
        
    };

    useEffect(() => {
        if (category === "All" ){
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
        if (size < 1000 ) {
            setCollapsed(true);
        } 
        if (size >= 1000 && !showBasket) {
            setCollapsed(false);
        }
    }, [size, showBasket])
    
	return (
        <>
        {!clock.checkEstimatesMilestone() ? 
        <Row align='center' style={{marginTop: '6.5rem', marginLeft: '3rem', marginRight: '3rem'}}> 
            <Col xs={12} sm={12} md={12} lg={12}> 

                <Alert show={!clock.checkEstimatesMilestone()} variant="warning">
                    <Alert.Heading className="mt-2" style={{fontSize: "2.5rem"}}>
                    <BsClockHistory size={38} className="mr-3"/>
                        Market not available
                    </Alert.Heading>
                    <p style={{fontSize: "2rem", margin: "4", padding: "0"}}>
                    We're sorry, the orders start at 9:00 am on Saturday. Stay up to date by joining  our  <a href={'https://t.me/spg05_bot'}>telegram bot!</a>
                    </p>
                </Alert>
                {/* <h3 style={{fontSize: "2.5rem", margin: "4", padding: "0", color: "#247D37"}}> 
                    We're sorry, the orders start at 9:00 am on Saturday. Stay up to date by joining  our  <a href={'https://t.me/spg05_bot'}>telegram bot!</a>
                </h3> */}
            </Col>
        </Row>
        : 
        <>
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Body style={{backgroundColor: "#d4edda"}}>
          <Alert variant="success">
              <Alert.Heading className="mt-2">
                <MdDoneOutline size={30} className="mr-3"/>
                Order Issued!
              </Alert.Heading>
              <p>
                You will receive soon a notification when it's ready.
              </p>
          </Alert>
          <Button style={{ backgroundColor: "#247D37", borderColor: "#247D37" , position:"right"}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
        </Modal>
        <Container fluid style={{paddingLeft: 0, paddingRight: 0 , maxWidth: "100%", overflowX:"hidden"}} {...props}>
            <AlertCancellingOrders show={props.show} currentClient={currentClient} cancelOrders={props.cancelOrders} setNotificationFlag={props.setNotificationFlag}/>
            <Basket basket={basket} setBasket={setBasket} setShow={setShow} client={client} currentClient={currentClient} setAlertWalletShow={setAlertWalletShow} clienthandleBasket={handleBasket} isOpen={showBasket} onRequestClose={handleBasket} userRole={userRole} />
            <AlertWallet show={alertWalletShow} setAlertWalletShow={setAlertWalletShow} topUp={topUp} setTopUp={setTopUp} onHide={() => {setAlertWalletShow(false); setTopUp(0)}} user={client} currentClient={currentClient} userRole={userRole}/>
            <Row>
                <Col xs={2} sm={2} md={2}>
                    <div className={`app `}>

                        <SideBar 
                        collapsed={collapsed}
                        width="13rem"
                        style={{minHeight: "95vh"}}
                        searchCategory={(cat) => searchCategory(cat)}
                        handleBasket={handleBasket}
                        userRole={userRole}
                        />
                    </div>

                </Col>
                <Col xs={10} sm={10} md={10}>
                    <Container fluid style={{marginTop:"2rem"}}>
                        <Row >
                            {filter ? 
                            filteredProducts.map(product => 
                                product.confirmed ? 
                                <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                    <Product product={product} basket={basket} setBasket={setBasket}/>
                                </Col> : ''
                                
                                )
                            
                            : 
                            products.map(product =>
                            product.confirmed ? 
                            <Col fluid key={`product-"${product.id}"`} xs={12} sm={6} md={4} lg={3} >
                                <Product product={product} basket={basket} setBasket={setBasket}/>
                            </Col> : ''
                            
                            )}
                        </Row>
                    </Container>

                </Col>
                
            </Row>



        </Container>
        </> 
        }
        
        </>
	);
}

Market.propTypes = {
    products: PropTypes.array.isRequired,
    client: PropTypes.object.isRequired
  };

export default Market;