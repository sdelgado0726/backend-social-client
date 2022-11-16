import React, {useContext, useState, useEffect} from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext";

const EditUsers = () => {
    let navigate = useNavigate();
    let { getUserProfile, editUser, setisLoggedIn } = useContext(UserContext);
    let {id} = useParams();

    let [editThisUser, setEditThisUser] = useState({
        id: getUserProfile.userId,
        username: "",
        firstName: "",
        lastName: "",
        state: ""
    })

    useEffect(() => {
        async function fetch() {
          await getUserProfile(id)
            .then((profile) => setEditThisUser(profile))
          }
          fetch()
    },  [getUserProfile, id])

    function handleChange(event) {
        setEditThisUser((prevValue) => {
            return {...prevValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editUser(editThisUser).then(() => {
            navigate(`/profile/${id}`);
            alert('Update is successful!');
        }).catch(error => {
            console.log(error);
            setisLoggedIn(false);
            localStorage.clear();
            navigate('/signin');
        });
    }

    return (

        <Container>
          <div  style={{paddingTop: '25px'}}>
            <Row>
              <Col xs='12' sm='12' md='12' lg='12' xl='12' style={{paddingBottom: '20px'}}>
                <h1 style={{textAlign: 'left'}}>Edit {editThisUser.username}'s Profile</h1>
              </Col>
              <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                <Form id='signUpForm' onSubmit={handleSubmit} style={{width: '325px'}}>
                      <Form.Group className="mb-3" >
                          <Form.Label>Username:</Form.Label>
                          <Form.Control type="text" name="username" value={editThisUser.username} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                          <Form.Label>First Name:</Form.Label>
                          <Form.Control type="text" name="firstName" value={editThisUser.firstName} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                          <Form.Label>Last Name:</Form.Label>
                          <Form.Control type="text" name="lastName" value={editThisUser.lastName} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                          <Form.Label>State:</Form.Label>
                          <Form.Control type="text" name="state" value={editThisUser.state} onChange={handleChange} />
                      </Form.Group>      
                    <Button type="submit" id="saveBtn" style={{backgroundColor: '#070B04', border: '#070B04'}}>Update</Button>
                  </Form>
              </Col>
            </Row>
          </div>  
        </Container>             
            
    )
}

export default EditUsers