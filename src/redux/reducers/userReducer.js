const INITIAL_STATE = {
    email: 'Enter Email',
    password: 'Enter Password',
    isLoggeIn: false
};

const userReducer = (state=INITIAL_STATE, action) => {
    console.log('inside reducer', action.payload);
    switch(action){
        case 'USER_SET_EMAIL':
            return{
                ...state,
                email: action.payload
            }
        case 'USER_SET_PASSWORD':
            return{
                ...state,
                password: action.payload
            }
        default: return state;
    }
}
export default userReducer;