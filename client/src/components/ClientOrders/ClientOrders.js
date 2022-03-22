import { useState, useEffect } from 'react';
import {Card, ButtonGroup, Button, Row, Col, ListGroup, Form} from 'react-bootstrap'
import {pickUpIcon, deliveryIcon, arrowRightIcon, arrowLeftIcon, iconDelete, iconEdit, iconCross, iconConfirm} from "../Icons";
import API from '../../API';
import dayjs from 'dayjs';
import gif from '../../img/preparation.gif';
import DeleteModal from './DeleteModal';

//area below table where are shown list of orders or the detail of one of them
function ClientOrders(props) {

    const {clientOrders} = props;
    const [selected, setSelected] = useState(false);
    const [order, setOrder] = useState();
    const [basket, setBasket] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleClick = () =>{
        if(selected)
            setSelected(false);
        else
            setSelected(true);
     }
        switch (props.status) {
            case "pending":
                return(<div className="borders mb-3" >
                    {
                        !selected ? 
                            <PendingList clientOrders={clientOrders} handleClick={handleClick} setOrder={setOrder}/> 
                            :
                            <>  
                                <SelectedOrder editable={true} handleClick={handleClick} order={order} basket={basket} setBasket={setBasket} setModalShow={setModalShow} />
                                <DeleteModal
                                    show={modalShow}
                                    setModalShow={setModalShow}
                                    clientOrders={clientOrders}
                                    order_id={order ? order.id : ''}
                                    basket={basket}
                                    onHide={() => { setModalShow(false)}}
                                />
                            </>
                    }
                </div>);
            case "accepted":
                return(<div className="borders mb-3" >
                {
                     !selected ? <AcceptedList acceptedOrders={clientOrders} handleClick={handleClick} setOrder={setOrder}/> : <SelectedOrder editable={false} handleClick={handleClick} order={order} basket={basket} setBasket={setBasket}/>
                }
            </div>);

            default:
                return(
                    <>
                    </>
                );
        }
}

//list of pending orders
function PendingList(props){

    const {clientOrders, handleClick, setOrder} = props;

    return(

            clientOrders.map((o) => (
                <Card key={o} className="my-3 mx-3" >
                    {/* <Card.Header>Featured</Card.Header> */}
                    <Card.Body>
                        <Row>
                        <Col xs={3} className="text-center my-auto">
                            <h4>Order #{o.id}</h4>
                            <hr/>
                            <strong> Total: <h2>€ {o.total.toFixed(2)}</h2></strong><br />
                        </Col>
                        <vr/>
                        <Col xs={7} className="my-auto">
                            <Row className="m-auto d-flex align-items-center"><h4 >Delivery method:&ensp; </h4> { o.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {o.address}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {o.date}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {o.time}</Row>
                        </Col>
                        <Col xs={2}  className=" text-right">
                            <Button id="selectButton" variant="outline-info" className="pheight-100" onClick={()=>{handleClick(); setOrder(o) }}>{arrowRightIcon}</Button>
                        </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted text-center"><small>Created: {o.creation_date}</small></Card.Footer>
                </Card>
            ))

    );
}

function AcceptedList(props){

    const orders = props.acceptedOrders;
    const handleClick = props.handleClick;
    const setOrder = props.setOrder;

    return(

            orders.map((o) => (
                <Card key={o} className="my-3 mx-3" >
                    <Card.Body>
                        <Row>
                        <Col xs={3} className="text-center my-auto">
                            <h4>Order #{o.id}</h4>
                            <hr/>
                            <strong> Total: <h2>€ {o.total.toFixed(2)}</h2></strong><br />
                        </Col>
                        <vr/>
                        <Col xs={5} className="my-auto">
                            <Row className="m-auto d-flex align-items-center"><h4 >Delivery method:&ensp; </h4> { o.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {o.address}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {o.date}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {o.time}</Row>
                        </Col>
                        <Col xs={3} className="my-auto" >
                            <h4>We are preparing your order!</h4>
                            <img width={150} height={150} src={gif} alt="order in preparation..." />
                        </Col>
                        <Col xs={1}  className=" text-right">
                            <Button id="detailsButton" variant="outline-info" className="pheight-100" onClick={()=>{handleClick(); setOrder(o) }}>{arrowRightIcon}</Button>
                        </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted text-center"><small>Created: {o.creation_date}</small></Card.Footer>
                </Card>
            ))

    );
}

//detail of selected order
function SelectedOrder(props){

    const {handleClick, order, setModalShow, basket, setBasket} = props;

    const [delivery, setDelivery] = useState(order.pick_up);
    const [address, setAddress] = useState(`${order.address.split(',')[0]}, ${order.address.split(',')[1]}`);
    const [city, setCity] = useState(order.address.split(',')[2]);
    const [zip, setZip] = useState(parseInt(order.address.split(',')[3]));
    const [date, setDate] = useState(order.date);
    const [time, setTime] = useState(order.time);
    const [isDisabled, setIsDisabled] = useState(delivery);

    const [edit, setEdit] = useState(false);
    const [dirty, setDirty] = useState(true);
    const [undo, setUndo] = useState(false);

    const sum = (key1, key2) => {
        return basket.reduce((a, b) => a + (b[key1]*b[key2] || 0), 0);
    };

    let total = sum("price", "quantity");

    const updateOrder = () =>{

        if(!basket.length){
            //basket is empty -> delete order
            setModalShow(true);
        }else{
            //basket not empty -> update order
            order.total = total;
            order.pick_up = delivery;
            order.address = `${address}, ${city}, ${zip}`;
            order.date = date;
            order.time = time;
            //update order info
            API.updateOrder(order).then(
                basket.map((product) => {
                    const productBasket = {
                        order_id: order.id,
                        product_id: product.id,
                        quantity: product.quantity,
                        diffQuantity: (product.quantity - product.startingQuantity)
                    };
                    //update availability of the deleted basket products in db
                    API.changeQuantity(productBasket.product_id, productBasket.diffQuantity).then(
                        //update basket product quantities
                        API.updateQuantityBasket(productBasket.order_id, productBasket.product_id, productBasket.quantity, 0).then((res) => {
                            if (!res) {
                                console.log("Error inserting basket in db.");
                            }      
                            setEdit(!edit); 
                            setUndo(true);
                            return res;
                        })
                    )
                })
            );
        }
    }

    useEffect(() => {
        if(order || undo){
          API.getBasket(order.id).then((products) => {
            setBasket(products.map((p) => ({...p, startingQuantity: p.quantity})));
            setUndo(false);
          })
        }
        console.log(basket);
    }, [order, undo]);

    useEffect(() => {
        if (dirty) {
            total = sum("price", "quantity");
            setDirty(false);
        }
    }, [dirty]);

    return(
        <div className="my-3 mx-3">
            <Row>
                <Col><h1>Order #{order.id}</h1></Col>
                <Col xs={5} className="text-right"><h1>€ {total.toFixed(2)}</h1></Col>
            </Row>
            <hr/>
            <Row>
                <Col >
                    {!edit ?
                        <div xs={12} md={4} lg={4}>
                            <Row className="m-auto d-flex align-items-center"><h4>Delivery method:&ensp; </h4> {order.pick_up ? pickUpIcon /* Pick-Up */ : deliveryIcon /* Delivery */}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Address:&ensp; </h4>  {order.address}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Date:&ensp; </h4> {order.date}</Row>
                            <Row className="m-auto d-flex align-items-center"><h4>Time:&ensp; </h4> {order.time}</Row>
                        </div>
                        :
                        <OrderForm
                            delivery={delivery}
                            setDelivery={setDelivery}
                            address={address}
                            setAddress={setAddress}
                            city={city}
                            setCity={setCity}
                            zip={zip}
                            setZip={setZip}
                            date={date}
                            setDate={setDate}
                            time={time}
                            setTime={setTime}
                            isDisabled={isDisabled}
                            setIsDisabled={setIsDisabled}
                        />
                    }

                </Col>

                <Col xs={12} lg={8} style={{ borderLeft: "2px solid #b4e6e2" }} >
                    <ListGroup as="ul" className="mb-3" id="basketList">
                        {
                            basket.map((p) => (
                                <ListIteam basket={basket} setBasket={setBasket} p={p} setDirty={setDirty} edit={edit} setEdit={setEdit} />
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
            {!edit?
            <Row className="mt-3">
                <Col className="text-center">
                    <Button id="backPendingList" variant="light" onClick={handleClick}>{arrowLeftIcon}Back</Button>
                </Col>
                {(props.editable) ? //Per francesco: ho aggiunto una props 'editable', serve per distinguere quando mostrare i pulsanti edit o cancel. La setto nin clientOrders
                <>
                    <Col className="text-center">
                        <Button id="deleteButton" variant="outline-dark" onClick={() => { setModalShow(true) }}>{iconDelete} Cancel</Button>
                    </Col>
                    <Col className="text-center">
                            <Button id="editButton" variant="light" onClick={() => { setEdit(!edit) }}>{iconEdit} Edit</Button>
                    </Col>
                </>
                :
                <>
                </>
                }
            </Row> :
            <Row className="mt-3">
                <Col className="text-center">
                    <Button id="undoButton" variant="outline-dark"  onClick={() => { setEdit(!edit); setUndo(true) }}>{arrowLeftIcon}Undo</Button>
                </Col>
                <Col className="text-center">
                    <Button variant="outline-success" id="confirmButton"
                      disabled={((delivery==='')||(address==='')||(city==='')||(zip.toString()==='')||(date==='')||(time==='')||(time<"09:00")||(time>"21:00"))? true : false}
                      onClick={updateOrder}
                    >
                        {iconConfirm} Confirm
                    </Button>
                </Col>
            </Row>


            }

        </div>
    );
}

//form to edit option of the selected order
function OrderForm(props){

    const {delivery, setDelivery, address, setAddress, city, setCity, zip, setZip, date, setDate, time, setTime, isDisabled, setIsDisabled } = props;

    return (
        <div xs={12} md={4} lg={4}>
            <h6 className="text-center"><strong>Select a delivery method:</strong></h6>
            <Form id='editForm'>
                <Row className='justify-content-center mb-3'>
                    <Col xs={6} md={6}>
                        <div key="default-radio" className="text-left">
                            <Form.Check
                                inline
                                label="Pick-Up"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                                checked={delivery === 1 ? true : false}
                                onClick={() => { setDelivery(1); setAddress("Corso Duca degli Abruzzi, 24"); setCity("Torino"); setZip("10129"); setIsDisabled(true); }}
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
                                checked={delivery === 1 ? false : true}
                                onClick={() => { setDelivery(0); setAddress(''); setCity(''); setZip(''); setIsDisabled(false); }}
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
                        <Form.Group className="mb-1" controlId="formGridAddress1">
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
                        <Form.Group className="mb-1" controlId="formGridAddress2">
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
                <h6 className="text-center"><strong>Select a pick-up/dalivery date & time:</strong></h6>
                <Row className='justify-content-center mt-3'>
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
                </Row>
                <Row className="text-center mb-2"><Col xs={12} md={12} lg={12}><small>Please, pick a time between 09:00 and 21:00</small></Col></Row>
            </Form>
        </div>
    );
}

//selected order product list + quantity modifiers and delete button
function ListIteam(props) {

    const {p, basket, setBasket, edit, setDirty} = props;
    const [quantity, setQuantity] = useState(p.quantity);

    const handleChange = (event, qty, availability) => {
        if (event.target.value > 0 && event.target.value <= (qty + availability)) {
            setDirty(true);
            let value = event.target.value;
            setQuantity(value);
            let isProduct = (product) => product == p;
            let index = basket.findIndex(isProduct);
            basket[index].quantity = value;
            setBasket(basket);
        }
    }

    console.log(basket);
    console.log(quantity);

    return (
        <ListGroup.Item as="li" key={p.id} id="basketItem">
            <Row>
                <Col xs={2} className="text-left">
                    <img src={p.img_path} className="img-fluid" style={{ height: "50px", width: "50px" }} />
                </Col>
                <Col xs={5} md={4} lg={4} className="text-left">
                    <strong>{p.name}</strong><br />
                    <small>ID: {p.id}</small><br />
                    Price/unity:<strong> € {p.price}</strong><br />
                </Col>
                <Col xs={3} md={3} lg={3} className="text-left">
                    {
                        !edit ?
                            <div className="text-center">
                                <strong>Quantity:</strong><br />
                                <ButtonGroup size="sm" aria-label="Basic example" >
                                    <input type="number" id="number" min="1" max={p.startingQuantity + p.availability}  value={p.quantity} className="quantity-modifier" disabled />
                                </ButtonGroup><br />
                            </div>
                            :
                            <div className="text-center">
                                <strong>Quantity:</strong><br />
                                <ButtonGroup size="sm" aria-label="Basic example" >
                                    <input type="number" id="number" min="1" max={p.startingQuantity + p.availability} value={p.quantity} onChange={(e)=>{handleChange(e, p.startingQuantity, p.availability)}} className="quantity-modifier"/>
                                </ButtonGroup><br />
                                <small>Available: {p.availability}</small>
                            </div>
                    }

                </Col>
                <Col xs={2} md={3} lg={3} className="justify-content-end d-flex flex-row align-items-start">
                    <ButtonGroup vertical aria-label="Basic example">
                        {edit? <Button variant="outline-light" onClick={() => { setBasket(basket.filter(product => product !== p)) }} size="sm">{iconCross}</Button> : ''}
                    </ButtonGroup>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}


export default ClientOrders;
export {PendingList, AcceptedList, SelectedOrder, OrderForm, ListIteam}


