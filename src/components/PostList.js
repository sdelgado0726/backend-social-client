import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import ListGroup from 'react-bootstrap/ListGroup'
import UserContext from '../contexts/UserContext';
import { Button } from 'react-bootstrap';


function PostList() {

  let {loggedInUser, setisLoggedIn} = useContext(UserContext);
  let {addPost, deletePost} = useContext(PostContext);
  let navigate = useNavigate();

  let [newPost, setNewPost] = useState({
    post: "",
    userId: null
  });

  function handleChange(event) {
    setNewPost((prevValue) => {
      return {...prevValue, [event.target.name]: event.target.value}
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPost(newPost).then(() => {
      navigate('/');
    }).catch(error => {
      console.log(error);
      setisLoggedIn(false);
      localStorage.clear();
      navigate('/signin');
    });
  }

  function handleDelete(id) {
    deletePost(id).then(() => {
      alert('Post deleted!')
      navigate(`/profile/${loggedInUser.userId}`)
    }).catch(error => {
      console.log(error);
      setisLoggedIn(false);
      localStorage.clear();
      navigate('/signin')
    });
  }

  
  return (

    <PostContext.Consumer>
      {
        ({posts}) => {

          return <div style={{paddingBottom: '80px'}}>
          <h1 style={{ paddingTop: '25px'}}>Blabber Feed</h1>
            {loggedInUser.userId && 
              <form onSubmit={handleSubmit}>
                <textarea placeholder="Enter New Blab" type="text" name="post" rows={3} cols={50} value={newPost.post} onChange={handleChange} />
                <br></br><br></br>
                {' '}<Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', border: '#000807'}}>Blab Away</Button>
              </form>
            }
            <br/>
            {posts.map((p) =>{
              return (
                <>
                <ListGroup className="align-self-start w-75" key={p.postId}>
                  <ListGroup.Item style={{ padding: '15px', margin: '25px', marginLeft: '3px', textAlign: 'left', paddingBottom: '2px', backgroundColor: '#F5F1E3' }}>
                    <div className="d-flex w-100 justify-content-end">
                      <small>{p.updatedAt}</small>
                    </div>
                    <p class="mb-1" style={{paddingLeft: '16px'}}>{p.post}</p>
                    <div className="d-flex w-100 justify-content-start">
                      <Link style={{paddingLeft: '15px', paddingBottom: '10px'}} to={`/profile/${p.userId}`} className="nav-link">{p.User.username}</Link>       
                    </div>
                    <div className="d-flex w-100 justify-content-end">
                      {loggedInUser && loggedInUser.userId === p.userId && <Link to={`/edit/${p.postId}`} className="btn btn-primary text me-2" style={{backgroundColor: '#A2A3BB', color: '#000807', marginBottom: '5px', border: '#A2A3BB'}}>Edit</Link>}{' '}
                      {loggedInUser && loggedInUser.userId === p.userId && <Button style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', border: '#000807'}} onClick={handleDelete.bind(this, p.postId)}>Delete Coffee</Button>}{' '}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                </>
              )
            })}
        
          </div>
        }
      }
    </PostContext.Consumer>
  )
  
}


export default PostList;