import {
    Row, Button, Form, Card,
  } from 'react-bootstrap';
  import { useState } from 'react';
  
  function LoginForm(props) {
    const { doLogIn } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (email === '' || password === '') {
        setInvalidEmail(email === '');
        setInvalidPassword(password === '');
      } else {
        doLogIn(email, password);
      }
    };
  
    const handleChange = (event) => {
      if (event.target.id === 'email') {
        setEmail(event.target.value);
        setInvalidEmail(event.target.value === '');
      } else if (event.target.id === 'password') {
        setPassword(event.target.value);
        setInvalidPassword(event.target.value === '');
      }
    };
  
    return (
      <div className="login">
        <Row className="mt-5 justify-content-center">
        <Card className="text-center" style={{ width: '24rem' }}>
          <Card.Body>
            <Form>
              <Form.Group className="text-left mb-4" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control isInvalid={invalidEmail} data-testid="testemail" placeholder="Enter Email" type="email" value={email} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please insert email.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="text-left mb-4" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control isInvalid={invalidPassword} placeholder="Enter Password" type="password" data-testid="testpassword" value={password} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please insert password.</Form.Control.Feedback>
              </Form.Group>
              <Button className="btn-lg btn-block" variant="danger" onClick={handleSubmit} data-testid="testbuttonlogin">Log In</Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      </div>
    );
  }
  
  export default LoginForm;