import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import { UserProvider } from './contexts/UserProvider';
import { PostProvider } from './contexts/PostProvider';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import EditUsers from './components/EditUsers';

function App() {


  return (
    <BrowserRouter>

      <UserProvider>
      <PostProvider>

            <Routes>
                <Route exact path="/" element={ <Home /> }> 
                  <Route index element={ <PostList /> } />
                  <Route path="/signup" element={ <SignUp /> } />
                  <Route path="/signin" element={ <SignIn /> } />
                  <Route path="/edit/:id" element={ <EditPost /> } />
                  <Route path="/profile/edit/:id" element={ <EditUsers /> } />
                  <Route path="/profile/:id" element={ <UserProfile /> } />
                </Route>
            </Routes>

      </PostProvider>
      </UserProvider>
      
    </BrowserRouter>
    
  );
}

export default App;
