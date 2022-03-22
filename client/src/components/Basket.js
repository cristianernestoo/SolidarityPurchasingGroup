import React, { useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import{ Container, Row, Col, Form, Button} from "react-bootstrap";
import 'react-sliding-pane/dist/react-sliding-pane.css';
import API from '../API';
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";

import { Order } from '../Order';

function Basket(props){
    const basket = props.basket;
    const setBasket = props.setBasket;
    const qty = basket.length;
    const client = props.client;
    const currentClient = props.currentClient;
    const {setShow, userRole} = props;
    const [delivery, setDelivery] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    let history = useHistory();

    let flag = false;

    const removeProduct = (p) =>{
        setBasket(basket.filter(product => product!== p));
    }

    const sum = (key) => {
        return basket.reduce((a, b) => a + (b[key] || 0), 0);
    }
    const total = sum("total");

    const handleShop = () => {
        if ((client && client.amount < total) || (currentClient && currentClient.amount < total)) {
            props.setAlertWalletShow(true);
            flag = true;
        }
        const id = dayjs().unix();
        const now = dayjs().format('YYYY-MM-DD');
        const myAddress = `${address}, ${city}, ${zip}`
        const order = new Order(
            id,
            now,
            client.id ? client.id : currentClient.id,
            client.name ? client.name : currentClient.name,
            client.surname ? client.surname : currentClient.surname,
            total,
            date,
            time,
            delivery,
            myAddress
        );

        API.createOrder(order).then(function (response) {
            basket.map((product) => {
                const productBasket = {
                    order_id: response.id,
                    product_id: product.id,
                    quantity: product.quantity,
                    updated: 0,
                };
                console.log(productBasket);
                API.changeQuantity(productBasket.product_id, productBasket.quantity);
                return API.createBasket(productBasket).then((res) => {
                    if (!res.inserted) {
                        console.log("Error inserting basket in db.");
                    }
                    return res.inserted;
                })
            })
        });

        if (flag === false) {
            if(userRole === 'shopemployee'){
                history.push({pathname:'/orders'});
            } else setShow(true);
        }

        flag = false;
    }

	return(
        <>
		<SlidingPane
            className="basket"
			width="23rem"
            from="left"
            isOpen={props.isOpen}
			onRequestClose={props.onRequestClose}
            hideHeader={true}
            {...props}
		>
			<Container>
                <Row className="justify-content-center">
                    <div
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 26,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',

                    }}
                    >
                    Your Basket
                    </div>
                </Row>
                <hr className='solid'/>
                {basket.map(product =>
                <Row key={`row-${product.id}`} className='product-basket '>
                    <Col xs={4} md={4}>
                        <div className='img-container'>
                            <img style={{height: "3rem", width:"3rem"}} src={product.img} alt={product.name}/>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <Row>
                            <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>{product.name} x {product.quantity}</h3>
                        </Row>
                        <Row>
                            <h3 style={{fontSize: "1rem", marginTop: "3px", padding: "0"}}>Total: €{product.total.toFixed(2)}</h3>
                        </Row>
                    </Col>
                    <Col xs={2} md={2}>
                        <Row style={{marginTop:"8px"}}>
                            <button className='cancel-basket' onClick={()=>{removeProduct(product)}} >
                                X
                            </button>
                        </Row>
                    </Col>

                </Row>
                )}
                { qty > 0 ?
                <>
                    <Row className='justify-content-center'>
                            <div
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                marginTop: "2rem",
                                fontSize: 22,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',

                            }}
                            >
                            Total: €{total.toFixed(2)}
                            </div>

                        </Row>
                    <hr className='solid'/>
                    <h6 className="text-center"><strong>Select a delivery method:</strong></h6>
                        <Form>
                            <Row className='justify-content-center mb-3'>
                                <Col xs={6} md={6}>
                                    <div key="default-radio" className="text-left">
                                        <Form.Check
                                            inline
                                            label="Pick-Up"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-1"
                                            onClick={()=>{setDelivery(1); setAddress("Corso Duca degli Abruzzi, 24"); setCity("Torino"); setZip("10129"); setIsDisabled(true);}}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={6}>
                                    <div key="default-radio" className="text-right">
                                        <Form.Check
                                            inline
                                            label="Delivery"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-2"
                                            onClick={()=>{setDelivery(0); setAddress(''); setCity(''); setZip(''); setIsDisabled(false);}}
                                            />
                                    </div>
                                </Col>
                            </Row>
                            <h6 className="text-center"><strong>Insert an Address:</strong></h6>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Form.Group className="mb-1" controlId="formGridAddress1">
                                        <Form.Control
                                            placeholder="1234 Main St"
                                            value={address}
                                            /* value={delivery===1 ? "Corso Duca degli Abruzzi, 24" : ""}      */
                                            onChange={(event) => setAddress(event.target.value)}
                                            disabled={isDisabled}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={6}>
                                    <Form.Group  className="mb-1" controlId="formGridAddress1">
                                        <Form.Control
                                            placeholder="City"
                                            value={city}
                                            /* value={delivery===1 ? "Torino" : ""} */
                                            onChange={(event) => setCity(event.target.value)}
                                            disabled={isDisabled}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={6}>
                                    <Form.Group  className="mb-1" controlId="formGridAddress2">
                                        <Form.Control
                                            placeholder="ZIP"
                                            value={zip}
                                            type="number"
                                            onChange={(event) => setZip(event.target.value)}
                                            disabled={isDisabled}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='justify-content-center mt-3'>
                                <h6 className="text-center"><strong>Select a pick-up/dalivery date & time:</strong></h6>
                                <Col xs={8} md={8}>
                                    <Form.Group className="mb-1" controlId="formDate">
                                        <Form.Control
                                            type="date"
                                            placeholder="date"
                                            value={date}
                                            data-testid="calendar"
                                            onChange={(event) => { setDate(event.target.value); }}
                                            min={dayjs().add(1, "w").day(3).format("YYYY-MM-DD")}
                                            max={dayjs().add(1, "w").day(5).format("YYYY-MM-DD")} />
                                    </Form.Group>
                                </Col>
                                <Col xs={8} md={8}>
                                    <Form.Group className="mb-1" controlId="formDate">
                                        <Form.Control
                                            type="time"
                                            placeholder="time"
                                            data-testid="time"
                                            value={time}
                                            min="09:00"
                                            max="21:00"
                                            onChange={(event) => { setTime(event.target.value); }} />
                                    </Form.Group>
                                </Col>
                                <small>Please, pick a time between 09:00 and 21:00</small>
                            </Row>
                        </Form>

                        <Row className='justify-content-center'>
                            <div className='card-button mb-4'>
                                <Button
                                    style={{fontWeight:"bold"}}
                                    onClick={()=>{handleShop()}}
                                    disabled={((delivery==='')||(address==='')||(city==='')||(zip==='')||(date==='')||(time==='')||(time<"09:00")||(time>"21:00"))? true : false}>
                                    Shop now
                                </Button>
                            </div>

                        </Row>
                </>
                    :
                    ''
                }


            </Container>
		    </SlidingPane>
        </>
	);
}

export default Basket;