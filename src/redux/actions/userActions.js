import axios from "axios"

export const setEmail = email => ({
        type: 'USER_SET_EMAIL',
        payload: email
})

export const setPassword = password => ({
        type: 'USER_SET_PASSWORD',
        payload: password
});

export const registerUser = () => (dispatch, getState) => {
    const { userReducer } = getState();
    const body = {
        email: userReducer.email,
        password: userReducer.password
    };    
    axios.post('/authService/createAccount', body)
        .then(() => {
            console.log('we in here!')
            dispatch(loginUser());
        })
        .catch((e) => console.log(e));
}

export const loginUser = () => (getState) => {
    console.log('in here in here in here!');
    const { userReducer } = getState();
    console.log('inside of the loginUser')
    const body = {
        email: userReducer.email,
        password: userReducer.password
    }
    
    axios.get('/authService/login', body)
        .then(() => {
            return{
                type: 'LOGIN_USER',
                payload: true
            }
        }).catch((e) => console.log(e));
}