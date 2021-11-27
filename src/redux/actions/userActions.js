import axios from "axios"

export const setEmail = email => {
    console.log('inside action', email)
    return {
        type: 'USER_SET_EMAIL',
        payload: email
    }
}

export const setPassword = password => {
    console.log('inside action', password);
    return {
        type: 'USER_SET_PASSWORD',
        payload: password
    }
}

export const registerUser = () => (dispatch, getState) => {
    console.log('registerUser')
    const { userReducer } = getState();
    console.log(userReducer);
    console.log('test', userReducer.email)
    const body = {
        email: userReducer.email,
        password: userReducer.password
    };
    console.log('before axios post')
    axios.post('/createAccount', body)
        .then(() => {
            console.log('success')
        })
        .catch(console.log)
}

export const loginUser = () => {

}

export const setAdmin = () => {
    return {
        type: 'USER_SET_ADMIN',
        payload: true
    }
}