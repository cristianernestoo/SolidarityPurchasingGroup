import React, {useEffect, useState} from "react";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import {Button, Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import API from "../API";
import {Link} from "react-router-dom";
import Chart from 'chart.js/auto'

function MonthlyReports(props) {
    const {orders} = props;
    const [products, setProducts] = useState([]);
    const [failedOrders, setFailedOrders] = useState([]);
    const [unretrievedFood, setUnretrievedFood] = useState([]);
    const [year, setYear] = useState('2022');
    useEffect(()=>{
            let products = [];
            let count = 0;
            orders.map(order => {
                API.getReportBasket(order.id).then((prod) => {
                    prod.map(p => products.push({...p, order_id: order.id, creation_date:order.creation_date }) );
                    count ++;
                    if(count === orders.length){
                        setData(orders, products, "2022");
                        setProducts(products);

                    }
                })
            })

    },[]);


    function setData(orders, products, y){
        let arrayOrders = [0,0,0,0,0,0,0,0,0,0,0,0];
        let arrayFood = [0,0,0,0,0,0,0,0,0,0,0,0];

        orders.filter(o => o.status === 'FAILED' && o.creation_date.substring(0,4) === y)
            .map(o => {
                switch(o.creation_date.substring(5,7)){
                    case '01' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[0] += 1;
                            }
                        })
                        arrayOrders[0] += 1;
                        break;
                    case '02' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[1] += 1;
                            }
                        })
                        arrayOrders[1] += 1;
                        break;
                    case '03' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[2] += 1;
                            }
                        })
                        arrayOrders[2] += 1;
                        break;
                    case '04' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[3] += 1;
                            }
                        })
                        arrayOrders[3] += 1;
                        break;
                    case '05' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[4] += 1;
                            }
                        })
                        arrayOrders[4] += 1;
                        break;
                    case '06' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[5] += 1;
                            }
                        })
                        arrayOrders[5] += 1;
                        break;
                    case '07' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[6] += 1;
                            }
                        })
                        arrayOrders[6] += 1;
                        break;
                    case '08' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[7] += 1;
                            }
                        })
                        arrayOrders[7] += 1;
                        break;
                    case '09' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[8] += 1;
                            }
                        })
                        arrayOrders[8] += 1;
                        break;
                    case '10' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[9] += 1;
                            }
                        })
                        arrayOrders[9] += 1;
                        break;
                    case '11' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[10] += 1;
                            }
                        })
                        arrayOrders[10] += 1;
                        break;
                    case '12' :
                        products.map(p => {
                            if(p.order_id === o.id){
                                arrayFood[11] += 1;
                            }
                        })
                        arrayOrders[11] += 1;
                        break;
                    default:
                        break;
                }
            })
        setFailedOrders(arrayOrders);
        setUnretrievedFood(arrayFood);
    }


    return (
        <div className="page">
            <Tabs activeKey={year} onSelect={(k) => {setYear(k); setData(orders, products, k)}} className="mb-3 months" align="center">
                <Tab eventKey="2021" title="2021">
                    <MonthlyReport orders={orders} products={products} unretrievedFood={unretrievedFood} failedOrders={failedOrders} y="2021"/>
                </Tab>
                <Tab eventKey="2022" title="2022">
                    <MonthlyReport orders={orders} products={products} unretrievedFood={unretrievedFood} failedOrders={failedOrders} y="2022"/>
                </Tab>
            </Tabs>

            <Row className="mt-5" >
                <Col xs={12} sm={12} md={3} >
                    <Link to={{ pathname: '/manager' }}>
                        <Button data-testid="button-back" size="md" className="mb-5 ml-5">Back</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

function MonthlyReport(props){
    const [key, setKey] = useState('01');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const completeM  = [[1, "01", "January"], [2, "02", "February"], [3, "03", "March"], [4, "04", "April"],
        [5, "05", "May"], [6, "06", "June"], [7, "07", "July"], [8, "08", "August"], [9, "09", "September"],
        [10, "10", "October"], [11, "11", "November"], [12, "12", "December"]]
    function filterProducts(month, y){
        let filter = [];
        let filteredO = props.orders.filter(o => o.status === 'FAILED' && o.creation_date.substring(5,7) === month && o.creation_date.substring(0,4) === y) ;
        props.products.map(p => {
            for(let o of filteredO)
                if(o.id === p.order_id)
                    filter.push(p);
        })
        return filter;
    }

    function getTotalFood(month) {
        return  props.unretrievedFood[month-1];
    }

    function getTotalFoodEuro(month, y) {
        let filter = filterProducts(month, y);
        let total = 0;
        filter.forEach(p => total += p.price * p.quantity);
        return total.toFixed(2);
    }


    return(
    <>
    <MDBContainer>
        <Bar data =  {{
            labels:months,
            datasets: [
                {
                    label: "Number of failed orders",
                    data: props.failedOrders,
                    backgroundColor: "rgba(98, 182, 239,0.4)",
                    borderWidth: 1,
                    borderColor: "#000000",
                }
            ]
        }}
        />
    </MDBContainer>
    <hr style={{ marginTop: 10, marginBottom: 10}} />
    <MDBContainer>
        <Bar data =  {{
            labels: months,
            datasets: [
                {
                    label: "Number of unretrieved food",
                    data: props.unretrievedFood,
                    backgroundColor: "rgba(113, 205, 205,0.4)",
                    borderWidth: 1,
                    borderColor: "rgba(113, 205, 205, 1)",
                }
            ]
        }}
        />
    </MDBContainer>
    <br/>
    <Tabs
        activeKey={key}
        onSelect={(k) => {setKey(k);}}
        className="mb-3 months"
        align="center"
    >
        {completeM.map(month =>
            <Tab eventKey={month[1]} title={month[2]}>
                <Row className='mt-3 mb-4' align='center'>
                    <UnretrievedFoodReport getTotalFoodEuro={getTotalFoodEuro} getTotalFood={getTotalFood} filterProducts={filterProducts} month={month[0]} monthString={month[1]} y={props.y}/>
                    <ProductTable products={filterProducts(month[1])}/>
                </Row>
            </Tab>
        )}
    </Tabs>
    </>
    )
}

function ProductTable(props) {
    return (
        props.products.length > 0 ?
        <Col xs={12} md={{ span: 8, offset: 2 }}>
            <Table striped bordered hover responsive >
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {props.products.map(product =>
                    <tr key={`${product.id}`} data-testid={`tr-${product.id}`}>
                        <td> {product.order_id}</td>
                        <td> {product.creation_date}</td>
                        <td>{product.name} </td>
                        <td> {product.quantity}</td>
                        <td>{product.price} €</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Col> : ""
    );
}

function UnretrievedFoodReport(props){
    return(
        <>
            <Col xs={12}>
                <h6>Total number of unretrived food this month: {props.getTotalFood(props.month)}</h6>
            </Col>
            <Col xs={12}>
                <h6>Total euro of unretrived food this month: {props.getTotalFoodEuro(props.monthString, props.y)} €</h6>
            </Col>
            <ProductTable products={props.filterProducts(props.monthString, props.y)}/>
        </>
    )
}
export default MonthlyReports;
export {MonthlyReport, ProductTable, UnretrievedFoodReport};
