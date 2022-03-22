import { Col, Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { shopIcon, virtualClock } from './Icons'

function NavBar(props) {

    const {loggedIn, doLogOut, userRole} = props;

    const roles = [{ role: 'client', link: 'Join our Community' },
                   { role: 'farmer', link: 'Become our Supplier' },
                   { role: 'rider', link: 'Deliver our Products' }];
    switch(userRole){
        case 'shopemployee' :
            return (
                <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */ className="nav">
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }} className="font-weight-bold" style={{ color: "white", textDecoration: "none" }}>
                            {shopIcon}
                            {' '}
                            SP⁵G
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto justify-content-around">
                            <Col lg={5}>
                                <Link to={{ pathname: '/products' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                                    Our Products
                                </Link>
                            </Col>
                            <Col lg={5}>
                                <Link to={{ pathname: '/clientlist' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                                    Clients List
                                </Link>
                            </Col>
                            <Col lg={5}>
                                <Link to={{ pathname: '/orders' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                    Orders List
                                </Link>
                            </Col>
                        </Nav>
                        <Nav className='d-flex justify-content-end' style={{marginRight : "0.5rem"}}>
                            <Link to={{pathname: '/clock'}} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>{virtualClock}</Link>
                        </Nav>
                        <Nav className="d-flex justify-content-end">
                            {
                                loggedIn ?
                                    <Col>
                                        <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Logout
                                        </Link>
                                    </Col>
                                    :
                                    <Link to={{ pathname: '/login' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                        Login
                                    </Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
          case 'client':
            return (
                <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */ className="nav">
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }} className="font-weight-bold" style={{ color: "white", textDecoration: "none" }}>
                            {shopIcon}
                            {' '}
                            SP⁵G
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto justify-content-around">
                            <Col lg={8}>
                                <Link to={{ pathname: '/products' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                                    Our Products
                                </Link>
                            </Col>
                            <Col lg={8}>
                                <Link to={{ pathname: '/client' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                    Your Orders
                                </Link>
                            </Col>
                        </Nav>
                        <Nav className='d-flex justify-content-end' style={{marginRight : "0.5rem"}}>
                            <Link to={{pathname: '/clock'}} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>{virtualClock}</Link>
                        </Nav>
                        <Nav className="d-flex justify-content-end">
                            {
                                loggedIn ?
                                    <Col>
                                        <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Logout
                                        </Link>
                                    </Col>
                                    :
                                    <Link to={{ pathname: '/login' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                        Login
                                    </Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
             case 'farmer':
                return (
                    <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */ className="nav">
                        <Navbar.Brand>
                            <Link to={{ pathname: '/' }} className="font-weight-bold" style={{ color: "white", textDecoration: "none" }}>
                                {shopIcon}
                                {' '}
                                SP⁵G
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mx-auto justify-content-around">
                                <Col lg={8}>
                                    <Link to={{ pathname: '/farmer' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                                        My Products
                                    </Link>
                                </Col>
                                <Col lg={8}>
                                    <Link to={{ pathname: '/farmerOrders' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                        My Orders
                                    </Link>
                                </Col>
                            </Nav>
                            <Nav className='d-flex justify-content-end' style={{marginRight : "0.5rem"}}>
                                <Link to={{pathname: '/clock'}} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>{virtualClock}</Link>
                            </Nav>
                            <Nav className="d-flex justify-content-end">
                                {
                                    loggedIn ?
                                        <Col>
                                            <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                                Logout
                                            </Link>
                                        </Col>
                                        :
                                        <Link to={{ pathname: '/login' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Login
                                        </Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
        default:
            return (
                <Navbar collapseOnSelect expand="lg"/*  bg="dark" variant="dark"  */ className="nav">
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }} className="font-weight-bold" style={{ color: "white", textDecoration: "none" }}>
                            {shopIcon}
                            {' '}
                            SP⁵G
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto justify-content-around">
                            <Col lg={3}>
                                <Link to={{ pathname: '/products' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }} /* className="mx-4" */>
                                    Our Products
                                </Link>
                            </Col>
                            {
                                roles.map((r) => (
                                    <Col lg={4} key={r.role}>
                                        <Link to={{ pathname: '/registerForm', state: r.role }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            {r.link}
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Nav>
                        <Nav className='d-flex justify-content-end' style={{marginRight : "0.5rem"}}>
                            <Link to={{pathname: '/clock'}} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>{virtualClock}</Link>
                        </Nav>
                        <Nav className="d-flex justify-content-end">
                            {
                                loggedIn ?
                                    <Col>
                                        <Link to={{ pathname: '/' }} onClick={doLogOut} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                            Logout
                                        </Link>
                                    </Col>
                                    :
                                    <Link to={{ pathname: '/login' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                                        Login
                                    </Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
    }
}

export default NavBar;
