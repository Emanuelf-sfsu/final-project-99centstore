const INITIAL_STATE = {
  chatData: {
    messages: []
  },
  text: '',
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        chatData: action.messages,
      };
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'INSERT_MESSAGE':
      console.log(action);
      console.log(state.chatData)
      const newMessages = [...state.chatData.messages, action.message];
      return {
        ...state,
        chatData: { ...state.chatData, messages: newMessages },
      };
    default:
      return state;
  }
};

export default messageReducer;