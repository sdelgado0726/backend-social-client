import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {

    const [ posts, setPosts ] = useState([]);
    const baseUrl = "http://localhost:3000/api/post/";

    useEffect(() => {
        async function fetchData() {
            await getAllPost();
        }
        fetchData();
    }, []);

    function getAllPost() {
        return axios.get(baseUrl).then(response => setPosts(response.data));
    }

    function getPost(id) {
        return axios.get(baseUrl + id).then(response => {
                return new Promise((resolve) => resolve(response.data))
            }        
        );  
    }

    function addPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}` 
        };
        
        return axios.post(baseUrl, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(baseUrl + post.postId, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deletePost(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}` 
        };

        return axios.delete(baseUrl + id, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <PostContext.Provider value={{
            posts,
            getPost,
            addPost,
            editPost,
            deletePost
        }}>
            { props.children }
        </PostContext.Provider>
    )
};