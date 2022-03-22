import { useEffect } from "react";
import{ Container, Table, Dropdown, ButtonGroup} from "react-bootstrap";
import API from '../API';
import {pickUpIcon, deliveryIcon} from "./Icons";

function OrdersList(props){

    const {orders, setOrders, loggedIn, dirty, setDirty, setSelectedOrder, setModalShow, setDate, setTime} = props;
 

    //change status of the selected order
    const changeStatus = async (order_id, status) => {
        API.changeStatus(order_id, status).then(() => {
            setDirty(true);
            console.log(dirty);
        });
    }

    useEffect(() => {
       
            //initialization of new ordersList 
            API.getAllOrders().then((o) => {
                setOrders(o)
                setDirty(false);
            });
     
    }, [loggedIn, dirty]);

    return (
        <Container fluid className="page width-100 below-nav table">
           <OrderTable data-testid="order-table" orders={orders} changeStatus={changeStatus} setSelectedOrder={setSelectedOrder} setModalShow={setModalShow} setDate={setDate} setTime={setTime}/>
        </Container>
    );
}

function OrderTable(props){

    const {orders, changeStatus, setSelectedOrder, setModalShow, setDate, setTime} = props;

    const handleClick = (o) => {
        setModalShow(true);
        setSelectedOrder(o);
        setDate(o.date);
        setTime(o.time);
    }


    return(
        <Table striped bordered hover responsive id="ordersTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Creation Date</th>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Client Surname</th>
                    <th>Total</th>
                    <th>Deliver Type</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((o) => (
                        <tr key={o.id} data-testid = {`tr-${o.id}`}>
                            <td onClick={()=>{handleClick(o)}}>{o.id}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.creation_date}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.client_id}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.client_name}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.client_surname}</td>
                            <td onClick={()=>{handleClick(o)}}><strong>€ {o.total.toFixed(2)}</strong></td>
                            {o.pick_up ? <td onClick={()=>{handleClick(o)}}> {pickUpIcon} Pick-Up  </td> : <td onClick={()=>{handleClick(o)}}> {deliveryIcon} Delivery </td>}
                            <td onClick={()=>{handleClick(o)}}>{o.address}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.date ? o.date : <strong>click to update</strong>}</td>
                            <td onClick={()=>{handleClick(o)}}>{o.time ? o.time : <strong>click to update</strong>}</td>
                            <td className="text-center">
                                <TableDropdown changeStatus={changeStatus} id={o.id} status={o.status} />
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
        </Table>
    );
}

function TableDropdown(props) {
    const {changeStatus, id, status } = props;

    return (
        <Dropdown size="sm" as={ButtonGroup}>
            <Dropdown.Toggle split id="dropdown-basic" size="sm" className="dropdown dropdown-btn">
                {status}
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item data-testid="PENDING" id="PENDING" onClick={(e) => { changeStatus(id, e.target.id) }}>PENDING</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item disabled data-testid="ACCEPTED" id="ACCEPTED" onClick={(e) => { changeStatus(id, e.target.id) }}>ACCEPTED</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item disabled data-testid="CANCELLING" id="CANCELLING" onClick={(e) => { changeStatus(id, e.target.id) }}>CANCELLING</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item disabled data-testid="FAILED" id="FAILED" onClick={(e) => { changeStatus(id, e.target.id) }}>FAILED</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item disabled data-testid="READY" id="READY" onClick={(e) => { changeStatus(id, e.target.id) }}>READY</Dropdown.Item><Dropdown.Divider />
                <Dropdown.Item data-testid="DELIVERED" id="DELIVERED" onClick={(e) => { changeStatus(id, e.target.id) }}>DELIVERED</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default OrdersList;
export {OrderTable, TableDropdown};

