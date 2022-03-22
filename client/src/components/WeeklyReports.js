import React, {useEffect, useState} from "react";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import {Button, Col, Row, Table} from "react-bootstrap";
import API from "../API";
import {Link} from "react-router-dom";
import Chart from 'chart.js/auto'

function WeeklyReports(props) {
    const {orders, clock} = props;
    const [monday, setMonday] = useState('');
    const [sunday, setSunday] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [unretrievedFood, setUnretrievedFood] = useState([]);
    useEffect(()=>{
            let d = clock;
            let m = getCurrentMonday(d);
            setMonday(new Date(d.setDate(m)));
            setSunday(new Date(d.setDate(m + 6)));
            let products = [];
            let count = 0;
            orders.map(order =>{
                API.getReportBasket(order.id).then((prod) => {
                    prod.map(p => products.push({...p, order_id: order.id }) )

                    count ++;
                    if(count === orders.length){
                        setData(new Date(d.setDate(m)), new Date(d.setDate(m + 6)), orders, products)
                    }
                })
            })
            setProducts(products);
    },[]);

    function getCurrentMonday(today){
        let d = today;
        let day =  d.getDay();
        return d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    }

    function getPreviousMonday(currentMonday){
        return new Date(new Date(currentMonday).setDate(new Date(currentMonday).getDate() - 7)).toUTCString();
    }
    function getPreviousSunday(currentSunday){
        return new Date(new Date(currentSunday).setDate(new Date(currentSunday).getDate() - 7)).toUTCString();
    }

    function getNextMonday(currentMonday){
        return new Date(new Date(currentMonday).setDate(new Date(currentMonday).getDate() + 7));
    }
    function getNextSunday(currentSunday){
        return new Date (new Date(currentSunday).setDate(new Date(currentSunday).getDate() + 7));
    }

    function setData(m, s, orders, products){
        setMonday(m);
        setSunday(s);

        let start = new Date(m).toISOString().slice(0,10);
        let end = new Date(s).toISOString().slice(0,10);
        let arrayOrders = [0,0,0,0,0,0,0];
        let arrayFood = [0,0,0,0,0,0,0];
        orders.filter(o => o.status === 'FAILED' && o.creation_date >= start && o.creation_date <= end)
            .map(o => {
                switch(new Date(o.creation_date).getDay()){
                    case 1 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[1] += 1;}
                        })
                        arrayOrders[1] += 1;
                        break;
                    case 2 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[2] += 1;}
                        })
                        arrayOrders[2] += 1;
                        break;
                    case 3 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[3] += 1;}
                        })
                        arrayOrders[3] += 1;
                        break;
                    case 4 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[4] += 1;}
                        })
                        arrayOrders[4] += 1;
                        break;
                    case 5 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[5] += 1;}
                        })
                        arrayOrders[5] += 1;
                        break;
                    case 6 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[6] += 1;}
                        })
                        arrayOrders[6] += 1;
                        break;
                    case 0 :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[0] += 1;}
                        })
                        arrayOrders[0] += 1;
                        break;
                    default:
                        break;
                }
            })

        let filter = [];
        let filteredO = orders.filter(o => o.status === 'FAILED' && o.creation_date >= start && o.creation_date <= end);
        products.map(p => {
            for(let o of filteredO)
                if(o.id === p.order_id)
                    filter.push(p);
        })
        setFilteredProducts(filter);
        setFilteredOrders(arrayOrders);
        setUnretrievedFood(arrayFood);
    }

    function getTotalOrder() {
        let total = 0;
        filteredOrders.forEach(i => total+=i);
        return total;
    }

    function getTotalFood() {
        let total = 0;
        unretrievedFood.forEach(i => total+=i);
        return total;
    }

    function getTotalFoodEuro() {
        let total = 0;
        filteredProducts.forEach(p => total += p.price*p.quantity);
        return total;
    }

    return (

          <div className="page">
          <Row className="mt-5" align='center'>
                <Col xs={12} sm={12} md={6} >
                    <Button data-testid="button-prev" size="lg" className="mt-1 mb-5" onClick={() => setData( getPreviousMonday(monday), getPreviousSunday(sunday), orders, products)}>Go to the previous week</Button>
                </Col>
                <Col xs={12} sm={12} md={6} >
                    <Button data-testid="button-next" size="lg" className="mt-1 mb-5" onClick={() => setData( getNextMonday(monday), getNextSunday(sunday), orders, products)}>Go to the next week</Button>
                </Col>
            </Row>
            <hr style={{ marginTop: 10, marginBottom: 10}} />
            <MDBContainer>
                <Bar data =  {{
                    labels: [
                        (new Date(sunday)).toDateString(), //sunday
                        (new Date(monday)).toDateString(), //monday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 1)).toDateString(), //tuesday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 2)).toDateString(), //Wednesday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 3)).toDateString(), //Thursday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 4)).toDateString(), //Friday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 5)).toDateString() //Saturday
                    ],
                    datasets: [
                        {
                            label: "Number of failed orders",
                            data: filteredOrders,
                            backgroundColor: "rgba(98, 182, 239,0.4)",
                            borderWidth: 1,
                            borderColor: "#000000",
                        }
                    ]
                }}
                />
            </MDBContainer>
            <Row className='mt-3 mb-4' align='center'>
                <Col xs={12}>
                    <h6>Total number of failed orders this week: {getTotalOrder}</h6>
                </Col>
            </Row>
            <hr style={{ marginTop: 10, marginBottom: 10}} />
            <MDBContainer>
                <Bar data =  {{
                    labels: [
                        (new Date(sunday)).toDateString(), //sunday
                        (new Date(monday)).toDateString(), //monday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 1)).toDateString(), //tuesday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 2)).toDateString(), //Wednesday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 3)).toDateString(), //Thursday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 4)).toDateString(), //Friday
                        new Date(new Date(monday).setDate(new Date(monday).getDate() + 5)).toDateString() //Saturday
                    ],
                    datasets: [
                        {
                            label: "Number of unretrieved food",
                            data: unretrievedFood,
                            backgroundColor: "rgba(113, 205, 205,0.4)",
                            borderWidth: 1,
                            borderColor: "rgba(113, 205, 205, 1)",
                        }
                    ]
                }}
                />
            </MDBContainer>
            <Row className='mt-3 mb-4' align='center'>
                <Col xs={12}>
                    <h6>Total number of unretrived food this week: {getTotalFood()}</h6>
                </Col>
                <Col xs={12}>
                    <h6>Total euro of unretrived food this week: {getTotalFoodEuro()} €</h6>
                </Col>
            </Row>
            {filteredProducts.length > 0 ?
                <Row className='mt-3 mb-4'>
                    <Col xs={12} md={{ span: 8, offset: 2 }}>
                        <Table striped bordered hover responsive >
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProducts.map(product =>
                                <tr key={`${product.id}`} data-testid={`tr-${product.id}`}>
                                    <td> {product.order_id}</td>
                                    <td>{product.name} </td>
                                    <td> {product.quantity}</td>
                                    <td>{product.price} €</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row> : <></>}

            <Row className="mt-5" >
                <Col xs={12} sm={12} md={3} >
                    <Link to={{ pathname: '/manager' }}>
                        <Button  data-testid="button-back" size="md" className="mb-5 ml-5">Back</Button>
                    </Link>
                </Col>
            </Row>
          </div>

    );
}

export default WeeklyReports;
