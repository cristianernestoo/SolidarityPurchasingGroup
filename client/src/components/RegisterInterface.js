import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import API from '../API';
import User from '../User';
import { useLocation, useHistory } from "react-router-dom";


function RegisterInterface(props) {
    const { userRole } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const role = useLocation().state;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;


        if (form.checkValidity() === false) {
            event.stopPropagation();

        } else {
            API.createUser(new User(role, firstName, lastName, dayjs(birthday).format('YYYY-MM-DD'), email, password)).then(() => { history.push("/clientlist"); })
        }

        setValidated(true);

    }

    const handleBack = () => {
        console.log(userRole);
        if (userRole === 'shopemployee') {
            history.push('/clientlist')
        } else {
            history.push('/');
        }

    }

    return (

        <>
            <Container as={Col} sm={8} md={8} className="register-form mt-5">
                <div className="text-center user-icon">
                    <FaUserCircle size={60}></FaUserCircle>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Form.Group as={Col} sm={5} md={6} controlId="fisrstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                data-testid="firstname"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please insert a name.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group as={Col} sm={6} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                data-testid='lastName'

                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please insert a surname.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} controlId="birthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                required
                                data-testid='Birthday'

                                type="date"
                                value={birthday}
                                onChange={(event) => setBirthday(event.target.value)}
                                max={dayjs().format("YYYY-MM-DD")}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please insert your birthday date.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/*
                    <Form.Group as={Col} sm={7} controlId="address" className="mt-5">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="via Roma"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert your address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="number" className="mt-5">
                        <Form.Label>N°</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="17"
                            value={number}
                            onChange={(event) => setNumber(event.target.value)}

                        />
                    </Form.Group>

                    <Form.Group as={Col} sm={4} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Torino"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a city.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Italy"
                            value={state}
                            onChange={(event) => setState(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a state.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={3} controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="10023"
                            value={postalCode}
                            onChange={(event) => setPostalCode(event.target.value)}

                        />
                        <Form.Control.Feedback type="invalid">
                            Please insert a postal code.
                        </Form.Control.Feedback>
                    </Form.Group>*/}

                        <Form.Group as={Col} sm={12} controlId="email" className="mt-5">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                data-testid='Email'

                                type="email"
                                placeholder="Enter your email.."
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please insert your email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} controlId="password" className="mt-1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                data-testid='Password'

                                type="password"
                                placeholder="Enter new password.."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please insert a new password.
                            </Form.Control.Feedback>
                        </Form.Group>



                    </Row>

                    <Row className="pb-4 mb-4 ml-4 pl-4">
                        <Col xs={5} sm={6} className="d-flex justify-content-start align-items-center">
                            <Button className="mt-5" data-testid="back-Button" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={handleBack}>back</Button>
                        </Col>

                        <Col xs={4} sm={5} className="d-flex justify-content-end align-items-center">
                            <Button className="mt-5" data-testid="submit-Button" variant="success" type="submit" style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>submit</Button>
                        </Col>
                        <Col></Col>

                    </Row>
                </Form>
            </Container>


        </>


    );
}


export default RegisterInterface;