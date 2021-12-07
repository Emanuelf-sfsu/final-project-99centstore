import axios from 'axios';

export const updateMessages = messages => {
  return {
    type: 'UPDATE_MESSAGES',
    messages,
  };
};

export const insertMessage = message => {
  console.log(message);
  return {
    type: 'INSERT_MESSAGE',
    message,
  };
};

export const handlTextChange = text => {
  return {
    type: 'UPDATE_TEXT',
    text,
  };
};

export const submitMessage = () => (dispatch, getState) => {
  console.log(getState().messageReducer)
  axios.post('/messanger/postMessage', { message: getState().messageReducer.chatData })
    .then(() => { })
    .catch(e => console.log(e));
  dispatch(handlTextChange(''));
};