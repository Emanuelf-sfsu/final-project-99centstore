const INITIAL_STATE = {
    email: '',
    password: '',
    isLoggedIn: null,
    isAdmin: false
};

const userReducer = (state = INITIAL_STATE, action) => {
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
            console.log('inside LOGIN_USER', state.isLoggedIn)
            return{
                ...state,
                isLoggedIn: action.payload
            }
        case 'USER_SET_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }
        case 'LOGOUT_USER':
            return{
               state: INITIAL_STATE
            }

        default: return state;
    }
}
export default userReducer;