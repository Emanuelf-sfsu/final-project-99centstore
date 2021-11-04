import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages } from './redux/actions/messageActions';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage';
import ViewListing from './ViewListing/ViewListing';
import Listings from './Listings/Listings';
import CreateListing from './CreateListing/CreateListing';

const App = () => {
  const text = useSelector(state => state.messageReducer.text);
  const messages = useSelector(state => state.messageReducer.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get('/messanger/getMessages')
    //   .then((res) => {
    //     dispatch(updateMessages(res.data));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  // const onSubmit = () => {
  //   dispatch(submitMessage());
  // }

  // const handleTextChange = (e) => {
  //   dispatch(handlTextChange(e.target.value));
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/viewListing/:id" element={<ViewListing />} />
        <Route exact path='/listing' element={<Listings />} />
        <Route path="/" element={<Navigate replace to="/listing" />} />
      </Routes>
    </div>
  );
};

export default App;
