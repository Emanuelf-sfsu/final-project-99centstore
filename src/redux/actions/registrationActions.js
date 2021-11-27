import axios from "axios"

export const userRegister = (obj) => {
    console.log(obj)
    return function () {
        axios.post('http://localhost:5001/authService/createAccount', obj)
    }
}
export const setName = (name) => ({
    type: 'SET_NAME',
    payload: name
});

export const setLastName = (lastName) => ({
    type: 'SET_LAST_NAME',
    payload: lastName,
});

export const setUsername = (userName) => ({
    type: 'SET_USER_NAME',
    payload: userName,
});

export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
});

export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    payload: password,
});

