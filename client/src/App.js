import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          {/* This code is defining a route for the root path ("/"). The "exact" prop is set to true,
          which means that this route will only match if the path is exactly "/". The "element" prop
          is set to `<Navigate to="/posts" />`, which will redirect the user to the "/posts" page
          when they visit the root path. */}
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          {/* This code is defining a route for the "/posts/:id" path, where ":id" is a dynamic
          parameter that can be any value. The "exact" prop is set to true, which means that this
          route will only match if the path is exactly "/posts/:id". The "element" prop is set to
          the <PostDetails /> component, which will render the details of a specific post based on
          the value of the ":id" parameter in the URL. */}
          <Route path="/posts/:id" element={<PostDetails />} />
          {/* This code is defining a route for the "/auth" path. If there is no user (i.e. the user is
          not logged in), the "element" prop will be set to the <Auth /> component, which will
          render the authentication page. If there is a user (i.e. the user is already logged in),
          the "element" prop will be set to <Navigate to="/posts" />, which will redirect the user
          to the "/posts" page. This is a way to prevent a logged-in user from accessing the
          authentication page again. */}
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;