import React, {useContext, useState, useEffect} from "react"
import PostContext from "../contexts/PostContext"
import { useParams, useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext";
import { Button, Container } from "react-bootstrap";


function EditPost() {

    let {id} = useParams();
    let navigate = useNavigate();
    let {editPost, getPost } = useContext(PostContext);
    let { setisLoggedIn } = useContext(UserContext);

    let [editThisPost, setEditThisPost] = useState({
        post: "",
        userId: getPost.userId
    })

    useEffect(() => {
        async function fetch() {
          await getPost(id)
            .then((posts) => setEditThisPost(posts))
          }
          fetch()
    },  [getPost, id])

    function handleChange(event) {
        setEditThisPost((prevValue) => {
            return {...prevValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editPost(editThisPost).then(() => {
            navigate(`/profile/${editThisPost.userId}`)
            alert('Update was successful!');
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
        () => {
            return (
                <Container>
                <div style={{paddingTop: '15px'}}>
                <h2 style={{ paddingLeft: '50px'}}>Edit Post</h2><br/>
                    <form onSubmit={handleSubmit} style={{paddingLeft: '50px', paddingTop: '15px'}}>
                        <span>Post:</span><br/>
                        <textarea type="text" name="post" rows={3} cols={40} value={editThisPost.post} onChange={handleChange} />
                        <br></br><br></br>
                        <Button type='submit' style={{marginBottom: '5px', backgroundColor: '#070B04', border: '#070B04'}}>Update</Button>
                    </form>
                    
                </div>
                <div style={{paddingBottom: '432px'}}>

                </div>
                </Container>
                
            )
        }
        }
        </PostContext.Consumer>
    )

}
  
export default EditPost;