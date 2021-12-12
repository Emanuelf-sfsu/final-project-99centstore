const INITIAL_STATE = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
}

const registrationReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'SET_NAME':
            return{
                ...state,
                name: action.payload
            }
        case 'SET_LAST_NAME':
            return{
                ...state,
                lastName: action.payload
            }
        case 'SET_USER_NAME':
            return{
                ...state,
                username: action.payload
            }
        case 'SET_EMAIL':
            return{
                ...state,
                email: action.payload
            }
        case 'SET_PASSWORD':
            return{
                ...state,
                password: action.payload
            }
        default: return state;
    };
};

export default registrationReducer;