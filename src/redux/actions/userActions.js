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
    console.log('registerUser')
    setTimeout(() => console.log('time out'), 3000)
    const { userReducer } = getState();
    console.log(userReducer);
    setTimeout(() => console.log('time out'), 3000)
    console.log('test', userReducer.email)
    const body = {
        email: userReducer.email,
        password: userReducer.password
    };    
    axios.post('authService/createAccount', body)
        .then(() => {
            dispatch(loginUser())
            
        })
        .catch(console.log)
}

export const loginUser = () => (getState) =>                                                     {
    const { userReducer } = getState();
    const body = {
        email: userReducer.email,
        password: userReducer.password
    }
    
    axios.get('authService/login', body)
        .then(() => {
            return{
                type: 'LOGIN_USER',
                payload: true
            }
        })
}