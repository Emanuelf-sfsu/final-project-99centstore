import axios from "axios"

export const setEmail = email => ({
        type: 'USER_SET_EMAIL',
        payload: email
})

export const setPassword = password => ({
        type: 'USER_SET_PASSWORD',
        payload: password
});

export const setAdmin = () => ({
    type: 'USER_SET_ADMIN',
    payload: true
})

export const registerUser = () => (dispatch, getState) => {
    const { userReducer } = getState();
    const body = {
        email: userReducer.email,
        password: userReducer.password
    };    
    axios.post('/authService/createAccount', body)
        .then(() => {
            console.log('we in here!')
            dispatch({type:'LOGIN_USER', payload: true});
        })
        .catch((e) => console.log(e));
}

export const loginUser = () => (dispatch, getState) => {
    const { userReducer } = getState();

    axios.get('/authService/login', {params:{
        email: userReducer.email,
        password: userReducer.password
    }})
        .then((response) => {
            console.log(response)
            if(!response.data.login){
                dispatch({type: 'LOGIN_USER', payload: false})
            }else{
                console.log('we made it inside .then()')
                dispatch({type: 'LOGIN_USER', payload: true})
            }
            
        }).catch((e) => console.log(e));
}

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})