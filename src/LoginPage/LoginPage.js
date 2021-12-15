import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setEmail, setPassword, setAdmin } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../ToastService';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const email = useSelector(state => state.userReducer.email);
    const password = useSelector(state => state.userReducer.password);
    const handleSubmit = e => {
        dispatch({ type: 'LOGIN_USER', payload: null })
        e.preventDefault();
        dispatch(loginUser());
        navigate('/');
    }
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn) {
            toastSuccess('Login Sucessful');
            navigate('/')
        } if (isLoggedIn === false) {
            console.log(isLoggedIn);
            toastError('Incorrect Credentials');
        }
    }, [isLoggedIn]);
    //deleted email.length from line 32 because it was causing an error
    useEffect(() => {
        const isEmailValid = email && email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        setDisabled(isEmailValid && password.length > 0);

    }, [email, password])

    // Insert code for Login / Create Account
    return (
        <>
            <div className="login-logo">
                <h1>Login</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!disabled}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default LoginPage;
