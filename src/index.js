import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { updateMessages } from './redux/actions/messageActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import rootReducer from './redux/reducers/rootReducer';
import axios from 'axios';
import { updateListing } from './redux/actions/listingActions';
import 'react-toastify/dist/ReactToastify.css';

// const rootReducer = combineReducers({
//   messageReducer,
// });

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(process.env)
const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${process.env.REACT_APP_WEBSOCKET_HOST}`) + '/websocket');

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


webSocket.onmessage = (message) => {
  console.log(message)
  if (isJson(message.data)) {
    const obj = JSON.parse(message.data);
    const { type } = obj;
    delete obj[type];
    if (type === 'message') {
      store.dispatch(updateMessages(obj));
    } else if (type === 'newListing' || type === 'image') {
      axios.get('/listingService/getAllListing').then(data => {
        store.dispatch(updateListing(data.data));
    })
    }
  }
  // store.dispatch(insertMessage(message.data));
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
