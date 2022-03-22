import {Container, Col, Tabs, Tab} from 'react-bootstrap';
import ClientOrders from './ClientOrders';

function ClientPage(props){
    
    const {clientOrders, clientAcceptedOrders} = props;

    return (
        <Container fluid className="page width-100 below-nav" >
            <Col>
                <h1 className="font-italic text-left mb-3">Your Orders</h1>
            </Col>
            <Tabs variant="tabs" defaultActiveKey="Pending" id="uncontrolled-tab-example" className=" tabs">
                <Tab eventKey="Pending" title="Pending">
                    <ClientOrders clientOrders={clientOrders} status={"pending"} />
                </Tab>
                <Tab eventKey="Accepted" title="Accepted">
                    <ClientOrders clientOrders={clientAcceptedOrders} status={"accepted"} />
                </Tab>
                <Tab eventKey="Cancelling" title="Cancelling" disabled>

                </Tab>
                <Tab eventKey="Delivered" title="Delivered" disabled>

                </Tab>
            </Tabs>
        </Container>
    );
}

export default ClientPage;