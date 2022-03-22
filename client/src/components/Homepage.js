import { Card, CardGroup, Container, Row, Col, Button } from 'react-bootstrap';
import backgroundimg from '../img/finale.mp4';
import { arrowIcon, telegramIcon } from './Icons';
import { Link } from 'react-router-dom';

function Homepage() {
    var style = {
        backgroundColor: "#000000",
        borderTop: "1px solid #E7E7E7",
        color: "#ffffff",
        textAlign: "center",
        padding: "20px",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }

    return (
        <div>
            <div style={{ overflowX: "hidden", position: "relative", maxHeight: "100vh", overflowY: "hidden", justifyContent: "center" }}>
                <video style={{ maxHeight: "122vh", width: "100vw", marginLeft: "0rem", marginRight: "0rem" }} data-testid="vidMyVideo" autoPlay loop muted>
                    <source src={backgroundimg} type='video/mp4' />
                </video>
                <div className="overlay">
                    <h1 style={{ color: "#ffffff" }}>
                        Welcome to SPG
                    </h1>
                </div>
                <div className="overlayArrow">
                    {arrowIcon}
                </div>
            </div>
            <CardGroup style={{ marginTop: "12vh", marginBottom: "12vh" }}>
                <Container fluid="md">
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://st3.depositphotos.com/5958522/32531/i/600/depositphotos_325318570-stock-photo-counter-with-fresh-vegetables-and.jpg" />
                            </Card>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <h1 style={{ color: "#247D37" }}>
                                Taste the equality
                            </h1>
                            <h4 style={{ marginTop: "7vh" }}>
                                It's local. It's fair. It's for our planet.
                            </h4>
                            <Link to={{ pathname: '/products' }} data-testid="linktoproducts" className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                <Button size="lg" variant="success" href="products" style={{ backgroundColor: "#247D37", marginTop: "7vh" }} > Discover our products </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </CardGroup>
            <div style={{ backgroundColor: "#DEDEDE", width: "100%" }}>
                <Container>
                    <Row style={{ textAlign: "center", justifyContent: "center" }} >
                        <h1 style={{ color: "#247D37", marginTop: "2rem" }}>
                            JOIN US!
                        </h1>
                    </Row>
                    <Row style={{ marginTop: "2rem" }} xs={1} sm={1} md={1} lg={3} xl={3} xxl={3} className="g-4">
                        <Col>
                            <Card style={{ marginBottom: "2rem" }}>
                                <Card.Img variant="top" style={{ objectFit: "cover", maxHeight: "30vh" }} src="https://images.pexels.com/photos/3962283/pexels-photo-3962283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                <Card.Body>
                                    <Card.Title style={{ overflowX: "hidden", overflowY: "hidden", textAlign: "center" }}>Why buying in SPG?</Card.Title>
                                    <Card.Text>
                                        In SPG the products travel an average of 61 kilometers before reaching the plate. Each territory holds a treasure of local products.
                                        <br></br>
                                        <br></br>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button size="lg" variant="success" style={{ backgroundColor: "#247D37", marginTop: "0.5rem", marginBottom: "0.5rem" }} >
                                        <Link to={{ pathname: '/registerform' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Become our Client
                                        </Link>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ marginBottom: "2rem" }} >
                                <Card.Img variant="top" style={{ objectFit: "cover", maxHeight: "30vh" }} src="https://www.altromercato.it/wp-content/uploads/2021/09/produttore_Hualtaco_Peru_AgrofairEurope-scaled-e1632143818906-800x582.jpg" />
                                <Card.Body>
                                    <Card.Title style={{ overflowX: "hidden", overflowY: "hidden", textAlign: "center" }}>Why selling in SPG?</Card.Title>
                                    <Card.Text>
                                        You decide the price and all orders are placed before distribution. So you will bring only what has been planned, and you will leave without any unsold goods.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button size="lg" variant="success" style={{ backgroundColor: "#247D37", marginTop: "0.5rem", marginBottom: "0.5rem" }} >
                                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Become our Supplier
                                        </Link>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ marginBottom: "2rem" }}>
                                <Card.Img variant="top" style={{ objectFit: "cover", maxHeight: "30vh" }} src="https://images.pexels.com/photos/7844008/pexels-photo-7844008.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                <Card.Body>
                                    <Card.Title style={{ overflowX: "hidden", overflowY: "hidden", textAlign: "center" }}>Work with us!</Card.Title>
                                    <Card.Text>
                                        Be part of the change.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button size="lg" variant="success" style={{ backgroundColor: "#247D37", marginTop: "0.5rem", marginBottom: "0.5rem" }} >
                                        <Link to={{ pathname: '/' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Become our Delivery person
                                        </Link>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <div style={style}>
                     Stay up to date by joining our telegram bot: <a href={'https://t.me/spg05_bot'}>{telegramIcon}</a>
                </div>
            </div>
        </div>

    );
}

export default Homepage;