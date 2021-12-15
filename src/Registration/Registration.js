import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setEmail, setPassword, registerUser } from '../redux/actions/userActions';
import { toastError, toastSuccess } from '../ToastService';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector(state => state.userReducer.email);
    const password = useSelector(state => state.userReducer.password);
    const [disabled, setDisabled] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser());
    }

    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    /* useEffect(() => {
    //     if (isLoggedIn) {
    //         toastSuccess('Login Sucessful');
    //         navigate('/')
    //         //changed line 26 to === null because false was causing an error, I thin this is because isLoggedIn is declared null in initial state reducer
    //     } if (isLoggedIn === false) {
    //         console.log(isLoggedIn);
    //         toastError('Incorrect Credentials');
    //     }
    // }, [isLoggedIn]); 
        Note: Was this an error? */

    //removed email.length from line 32 because it was causing an undefined problme, see if we can find a way to put it back in while fixing the bug
    useEffect(() => {
        const isEmailValid = email && email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        setDisabled(isEmailValid && password.length > 0);

    }, [email, password])
    return (
        <>

            <div className="registration-logo">
                <h1>Register</h1>
            </div>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder={"Enter Email"} value={email} onChange={e => dispatch(setEmail(e.target.value))} />                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder={"Enter Password"} value={password} onChange={e => dispatch(setPassword(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Terms and conditions" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!disabled}>
                    Submit
                </Button>
            </Form>
            <Link to='/login'>Already have an account? </Link>

        </>
    )
}

export default Registration;


