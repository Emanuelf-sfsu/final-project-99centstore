import axios from 'axios';

export const Login = async (obj) => {
    const resp = await axios.post('authService/login', obj);
    return resp
}
