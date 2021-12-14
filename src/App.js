import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage';
import ViewListing from './ViewListing/ViewListing';
import Listings from './Listings/Listings';
import CreateListing from './CreateListing/CreateListing';
import Registration from './Registration/Registration';
import Container from 'react-bootstrap/Container'
import NavbarComponent from './NavbarComponent';
import { ToastContainer } from 'react-toastify';

const App = ({ store }) => {
  console.log('this will be a test!');
  return (
    <Container className="App">
      <ToastContainer />
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/viewListing/:id" element={<ViewListing />} />
        <Route path="/editListing/:id" element={<CreateListing />} />

        <Route exact path='/listing' element={<Listings />} />
        <Route path="/" element={<Navigate replace to="/listing" />} />
        <Route path="/registration" element={<Registration store={store}/>} />
      </Routes>
    </Container>
  );
};

export default App;
