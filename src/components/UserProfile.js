import React, { useContext, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import UserContext from '../contexts/UserContext';

const UserProfile = () => {

    let {id} = useParams();
    let navigate = useNavigate();

    let { getUserProfile, loggedInUser, setisLoggedIn } = useContext(UserContext);
    let { deletePost } = useContext(PostContext);
    
    let [getUser, setGetUser] = useState("")

    useEffect(() => {
        async function fetch() {
          await getUserProfile(id)
            .then((getUser) => {
                setGetUser(getUser)
            }).catch(error => {
                console.log(error);
                setisLoggedIn(false);
                localStorage.clear();
                navigate('/signin')
            })
          }
          fetch()
    },  [getUserProfile, id])

    function handleDelete(id) {
        deletePost(id).then(() => {
            navigate(`/profile/${getUser.userId}`);
        }).catch(error => {
            console.log(error);
            setisLoggedIn(false);
            localStorage.clear();
            navigate('/signin');
        });
    }


    return (

        <PostContext.Consumer>
            {
                ({posts}) => {
                    return <div style={{paddingBottom: '80px', paddingTop: '25px'}}>
                    <h1>User Profile: {getUser.username}</h1>
                        {loggedInUser && loggedInUser.userId === getUser.userId &&
                            <Link style={{color: 'black'}} to={`/profile/edit/${getUser.userId}`}>Edit Profile</Link>}
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name: </td>
                                    <td style={{paddingLeft: '15px'}}>{getUser.firstName}{' '}{getUser.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Location: </td>
                                    <td style={{paddingLeft: '15px'}}>{getUser.state}</td>
                                </tr>
                                <tr>
                                    <td>Profile Created: </td>
                                    <td style={{paddingLeft: '15px'}}>{getUser.createdAt}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h1 style={{paddingTop: '25px'}}>Blabber</h1>

                        {posts.map((p) => {
                            return (
                                <>
                                    {getUser.userId === p.userId &&
                                    <>
                                    <ListGroup key={p.postId} >
                                        <ListGroup.Item style={{ padding: '15px', margin: '25px', marginLeft: '3px', textAlign: 'left', paddingBottom: '2px', backgroundColor: '#F5F1E3' }}>
                                            <div className="d-flex w-100 justify-content-end">
                                                <small>{p.updatedAt}</small>
                                            </div>
                                            <p className="mb-1" style={{paddingLeft: '16px'}}>{p.post}</p>
                                            <div style={{paddingLeft: '15px', paddingBottom: '10px'}} className="d-flex w-100 justify-content-start">
                                                {p.User.username}
                                            </div>
                                            <div className="d-flex w-100 justify-content-end">
                                                {loggedInUser && loggedInUser.userId === p.userId && <Link to={`/edit/${p.postId}`} className="btn btn-primary text me-2" style={{backgroundColor: '#A2A3BB', color: '#000807', marginBottom: '5px', border: '#A2A3BB'}}>Edit</Link>}{' '}
                                                {loggedInUser && loggedInUser.userId === p.userId && <Button style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', border: '#000807'}} onClick={handleDelete.bind(this, p.postId)}>Delete</Button>}
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    </>}
                                </>
                            )
                        })}

                    </div>
                }
            }
        </PostContext.Consumer>

    ) 
        
};

export default UserProfile;