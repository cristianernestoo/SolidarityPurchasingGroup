import { Container, Table, Row, Button, Form, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {IoWallet} from "react-icons/io5";
import '../App.css';
import API from '../API';
import { useState, useEffect} from 'react';
import dayjs from 'dayjs';

function ListOfClients(props){
    const [allClients, setAllClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(""); //client selected
    const [view, setView] = useState("view"); //2 possible values: view for visualizing all clients, search for visualizing only search results
    const [search, setSearch] = useState(""); //value to search


    useEffect(()=>{
        API.getAllClients().then((clients)=>{
          setAllClients(clients);
        })
      },[])

    const handleClick = (client) => {
        props.setWalletShow(true);
        props.setUser(client);
        API.getNotifications(client.id).then((notification)=>{
            if(notification.length > 0){
                API.getCancellingOrdersByClientId(client.id).then((orders) => {
                    let tot = 0;
                    orders.map((o) => {tot += o.total});
                    props.setAmountCancellingOrders(tot);
                });
            }
        });
    }

    return(
        <Container className="page below-nav table">
            <Row className="justify-content-center align-items-center mb-2">
                <Col xs={10} md={6}>
                    <h1 className="font-italic mt-3">Select a client</h1>
                </Col>
                <Col xs={2} md={6} className="d-flex justify-content-end" >
                    <Form.Control onChange={(ev) => {
                        var value = ev.target.value;
                        if(value !== ""){
                            setView("search");
                            setSearch(value);
                        }
                        else{
                            setView("view");
                        }                        
                    }} 
                     style={{marginTop:"1rem", width:"20rem"}}  id="inlineFormInputName2" placeholder="Search here..."/>
                </Col>
            </Row>
            
            <Table responsive variant="light">
                <thead >
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th><IoWallet size={27}></IoWallet></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(view === "view") ? 
                    allClients.map((client) => (
                       <tr key={client.id} className="p-0" style={selectedClient === client ? {backgroundColor: "#d4edda"} : {}} onClick={()=>{setSelectedClient(client);}}>        
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{dayjs(client.birthdate).format("YYYY-MM-DD")}</td>
                            <td>{client.email}</td>
                            <td>€ {client.amount.toFixed(2)}</td>
                            <td><Button size="sm" variant="outline-info" className="ml-5" onClick={() => handleClick(client)}>Top up</Button></td>
                       </tr>
                    ) )
                    :
                    allClients.filter((c) => c.name.includes(search) || c.surname.includes(search) || c.email.includes(search)).map((client) => (
                        <tr key={client.id} className="p-0" style={selectedClient === client ? {backgroundColor: "#d4edda"} : {}} onClick={()=>{setSelectedClient(client);}}>        
                             <td>{client.name}</td>
                             <td>{client.surname}</td>
                             <td>{dayjs(client.birthdate).format("YYYY-MM-DD")}</td>
                             <td>{client.email}</td>
                             <td>€ {client.amount.toFixed(2)}</td> 
                             <td><Button size="sm" variant="outline-info" className="ml-5" onClick={() => handleClick(client)}>Top up</Button></td>
                        </tr>
                     ))}
                </tbody>
            </Table>
        
            <Row>
                <Col sm={12} md={6}>
                    <Link to={{ pathname: '/registerform' , state:'client' }}>
                        <Button style={{backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color:'black'}} className="mt-5">Add a new client</Button>
                    </Link>
                </Col>
                <Col sm={12} md={6} className="d-flex justify-content-end">
                    <Link to={{ pathname: '/products',  state: {client: {id: selectedClient.id, name:selectedClient.name, surname:selectedClient.surname, birthdate: selectedClient.birthdate, amount: selectedClient.amount}} }}>
                        <Button size="lg" className="mt-5" disabled={selectedClient===""} style={{backgroundColor: '#247D37', border: '0px', borderRadius: '4px'}}>Shop now</Button>
                    </Link>
                </Col>
            </Row>
            
        </Container>
    );
}

export default ListOfClients;