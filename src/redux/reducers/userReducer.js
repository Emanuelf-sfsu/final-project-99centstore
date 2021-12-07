const INITIAL_STATE = {
    email: '',
    password: '',
    isLoggeIn: false,
    isAdmin: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    console.log('inside reducer', action.payload);
    switch (action.type) {
        case 'USER_SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'USER_SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        case 'LOGIN_USER':
            return{
                ...state,
                isLoggeIn: action.payload
            }
        case 'USER_SET_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }

        default: return state;
    }
}
export default userReducer;