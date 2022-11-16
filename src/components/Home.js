import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { Stack, Container, Nav, Navbar } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import "./Home.css";

function Home() {
  const { loggedInUser, isLoggedIn, signOutUser } = useContext(UserContext);


  return (
    <>
      <Navbar className="Navbar">
        <Navbar.Brand className="logo" href='/'>
            <img
              alt=""
              src={"https://mir-s3-cdn-cf.behance.net/projects/404/bb931455379241.Y3JvcCwxOTk5LDE1NjQsMCw0.png"}
              width="45"
              height="45"
              style={{ padding: "5px" }}
            />{" "}
            Blabber
          </Navbar.Brand>
        <Container className="justify-content-end">
            {loggedInUser.userId && <Link className="nav-link" style={{paddingRight: '15px', color: "#A2A3BB"}} to={`/profile/${loggedInUser.userId}`}>Welcome {loggedInUser.firstName}!</Link>}
            <Link className="nav-link" style={{paddingRight: '15px', color: "#A2A3BB"}} hidden={isLoggedIn} to="/signup">Sign Up</Link>
            <Link className="nav-link" style={{paddingRight: '15px', color: "#A2A3BB"}} hidden={isLoggedIn} to="/signin" >Sign In</Link>
            <Link className="nav-link" style={{paddingRight: '10px', color: "#A2A3BB"}} to="/">All Posts</Link>
            {loggedInUser.userId && <Nav.Link onClick={signOutUser}>Log Off</Nav.Link>}
            
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto">
        <Outlet />
      </Stack>
      <footer
        style={{ backgroundColor: "#000807", color: "#A2A3BB" }}
        className="footer"
      >
        <div className="footer-copyright text-center py-3">
          © 2022 Blabber • Website Design by Stephanie Delgado
        </div>
      </footer>
    </>
    
  );
}

export default Home;