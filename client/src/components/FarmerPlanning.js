import { Container, Table, Row, Col, Form, Button, Modal, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill, BsTrash, BsPencilSquare, BsFillInfoCircleFill } from "react-icons/bs";
import PlanningModal from "./PlanningModal";
import { useState, useEffect } from 'react';
import ConfirmModal from "./ConfirmModal";
import API from "../API";


function FarmerPlanning(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productNW, setProductNw] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [showPopUp, setShowPopUp] = useState(false);
    const [disable, setDisable] = useState(false);
    
    const deleteTask = (ID) => {
        const del = async () => {
            await API.deleteProductNW(ID);
            setDirty(true);

        };
        del();
    }

    useEffect(() => {


        const getProductNW = async () => {

            try {
                const inProductNW = await API.getProductNW(props.userid);
                setProductNw(inProductNW);
                setDirty(false);
                if (inProductNW.filter(p => p.farmer_id == props.userid && p.confirmed_by_farmer == 1).length > 0) {
                    setDisable(true);
                }
            } catch (e) {
                console.log(e);
            }
        };


        getProductNW();




    }, [modalShow, dirty]);



    useEffect(() => {
        const controlUno = async () => {
            if (props.clock.checkProductsAvailabilityMilestone()) {
                
                    try {
                        await API.deleteAllProductNW();
                    } catch (e) {
                        console.log(e);
                    }
                
            }
        }

        const controlDue = async () => {
            if ((props.clock.time.getDay() == (0 || 1 || 2)) || props.clock.checkEstimatesMilestone() || (props.clock.time.getDay() == 3 && (props.clock.time.getHours() <= 9))) {
                    try {
                        await API.deleteAllProductNWNotConfirmed();

                    } catch (e) {
                        console.log(e);
                    }
                    setDisable(true);
            }

        }

        const controlTre = () => {
            if((props.clock.time.getDay()==(4 || 5)) || (props.clock.time.getDay() == 3 && (props.clock.time.getHours() >= 9)) || (props.clock.time.getDay() == 6 && (props.clock.time.getHours() < 9))){
                setDisable(false);
            }

        }
        
        controlDue();
        controlUno();
        controlTre();

    }, []);

    const closePopUp = () => { setShowPopUp(false); window.location.reload(); };



    return (

        <Container className="page below-nav table">


            <FormTable disable={disable} clock={props.clock} setShowPopUp={setShowPopUp} farmerProducts={props.farmerProducts} userid={props.userid} productNW={productNW} products={props.products} deleteTask={deleteTask} setModalShow={setModalShow} setUpdate={setUpdate} setId={setId} setDirty={setDirty} />
            <div className="fixed">
                <Button variant="light" disabled={disable} onClick={() => { setModalShow(true) }}><BsFillPlusCircleFill data-testid="BsFillPlusCircleFill" className={disable ? '' : 'pointer'} size={40} color="#28a745" /></Button>
                <PlanningModal
                    show={modalShow}
                    onHide={() => { setModalShow(false); setUpdate(false) }}
                    products={props.products}
                    farmerProducts={props.farmerProducts}
                    userid={props.userid}
                    update={update}
                    setUpdate={setUpdate}
                    setDirty={setDirty}
                    id={id}
                    productNW={productNW}

                />
            </div>
            <Modal
                centered
                show={showPopUp}
                onHide={closePopUp}
                size='sm' {...props}
            >
                <Modal.Header closeButton />
                <Modal.Body style={{ backgroundColor: "#fff3cd" }}>
                    <Alert variant="success">
                        <Alert.Heading className="mt-2">
                            Success
                        </Alert.Heading>
                        <p>
                            The products was inserted
                        </p>
                        <p>
                            You can't add new products
                        </p>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#247D37", borderColor: "#247D37", position: "left" }} onClick={closePopUp}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>


    );
}


function FormTable(props) {
    const [view, setView] = useState("view"); //2 possible values: view for visualizing all clients, search for visualizing only search results
    const [search, setSearch] = useState(""); //value to search
    const [modal, setModal] = useState(false);

    return (
        <>
            <Row className="justify-content-start align-items-center mb-2">
                <Col xs={10} md={6}>
                    <h1 className="font-italic mt-3">Your Planning
                        <BsFillInfoCircleFill className="justify-content-start align-items-center ml-4" fill="green" style={{ height: "30px", width: "30px" }} />
                    </h1>
                </Col>

                <Col xs={10} md={6} className="d-flex justify-content-end" >
                    <Form.Control data-testid="searchBar" onChange={(ev) => {
                        var value = ev.target.value;
                        if (value !== "") {
                            setView("search");
                            setSearch(value);
                        }
                        else {
                            setView("view");
                        }
                    }}
                        style={{ marginTop: "1rem", width: "20rem" }} id="inlineFormInputName2" placeholder="Search here..."></Form.Control>
                </Col>

            </Row>
            <Row className="justify-content-start align-items-center mb-2">




            </Row>

            <Table responsive variant="light">
                <thead >
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Edit Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {(view === "view") ?
                        props.productNW.filter(p => p.farmer_id == props.userid)
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.id} {props.farmerProducts.filter(f => f.name == r.name)
                                        .map(c =>
                                            <img data-testid='img'  key={c.id} src={c.img_path} className="img-fluid" style={{ height: "50px", width: "50px" }} />)} </td>
                                    <td>{r.quantity}</td>
                                    <td>{r.price}</td>
                                    <td><Button data-testid='BsPencilSquare' variant="light" disabled={props.disable} onClick={() => { props.setModalShow(true); props.setUpdate(true); props.setId(r.id); }}><BsPencilSquare  size={30} className={props.disable ? '' : 'pointer'} /></Button></td>
                                    <td data-testid='tdd'><Button data-testid='BsTrash' variant="light" disabled={props.disable} onClick={() => { props.deleteTask(r.id); }}><BsTrash  size={30} className={props.disable ? '' : 'pointer'} fill="red" /></Button></td>
                                </tr>)
                            )
                        :
                        props.productNW.filter(p => p.farmer_id == props.userid)
                            .filter((t) => t.name.includes(search))
                            .map(r => (
                                <tr key={r.id} className="p-0" >
                                    <td>{r.id} {props.farmerProducts.filter(f => f.name == r.name)
                                        .map(c =>
                                            <img data-testid='img' key={c.id} src={c.img_path} className="img-fluid" style={{ height: "50px", width: "50px" }} />)} </td>
                                    <td>{r.quantity}</td>
                                    <td>{r.price}</td>
                                    <td><Button data-testid='BsPencilSquare' variant="light" disabled={props.disable} onClick={() => { props.setModalShow(true); props.setUpdate(true); props.setId(r.id); }}><BsPencilSquare  className={props.disable ? '' : 'pointer'} /> </Button></td>
                                    <td><Button data-testid='BsTrash' variant="light" disabled={props.disable} onClick={() => { props.deleteTask(r.id); }}><BsTrash data-testid='BsTrash' className={props.disable ? '' : 'pointer'} fill="red" /> </Button></td>
                                </tr>)
                            )
                    }
                </tbody>
            </Table>
            <Row>
                <Col xs={6} md={6} className="d-flex justify-content-start">
                    <Link to={{ pathname: '/farmer' }}>
                        <Button size="lg" data-testid="back-Button" className="mt-5" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} >Back</Button>
                    </Link>
                </Col>
                <Col xs={6} md={6} className="d-flex justify-content-end">
                    <Button disabled={props.disable} data-testid='estimation' style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'black' }} className="mt-5" onClick={() => { setModal(true) }}>Provide your estimation</Button>
                    <ConfirmModal
                        setShowPopUp={props.setShowPopUp}
                        show={modal}
                        onHide={() => setModal(false)}
                        productNW={props.productNW}
                        products={props.products}
                        userid={props.userid}
                        setDirty={props.setDirty}
                        farmerProducts={props.farmerProducts}

                    />
                </Col>
            </Row>

        </>


    );
}



export default FarmerPlanning;
export { FormTable };