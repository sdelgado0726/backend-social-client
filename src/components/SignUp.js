import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';


const SignUp = () => {
    let [ newUser, setNewUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        state: ""
    })

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        createUser(newUser).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: ' + error.response.data);
        });
    }

    return (
        <Container>
            <div className="d-flex justify-content-center" style={{paddingTop: '65px'}}>
                <Row>
                    <Col xs='12' sm='12' md='12' lg='12' xl='12' style={{paddingBottom: '20px'}}>
                        <h1>REGISTER</h1>
                    </Col>
                    <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                        <Form id='signUpForm' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Username:</Form.Label>
                                <Form.Control placeholder='Enter Username' type="text" name="username" required value={newUser.username} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control placeholder='Enter Password' type="password" name="password" required value={newUser.password} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control placeholder='Enter First Name' type="string" name="firstName" required value={newUser.firstName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control placeholder='Enter Last Name' type="text" name="lastName" required value={newUser.lastName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>State:</Form.Label>
                                <Form.Control placeholder='Enter State' type="text" name="state" required value={newUser.state} onChange={handleChange} />
                            </Form.Group>
                            <Button type="submit" id="saveBtn" style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', marginTop: '15px', border: '#000807'}}>Register</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        
        </Container>
    )
        
    
};

export default SignUp;