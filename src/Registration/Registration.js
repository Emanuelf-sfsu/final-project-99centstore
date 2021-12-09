import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setEmail, setPassword, registerUser } from '../redux/actions/userActions';


const Registration = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.userReducer.email);
    const password = useSelector(state => state.userReducer.password);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser())
    }
    useSelector(state=>console.log(state));
    return (
        <>

            <div className="registration-logo">
                <h1>Register</h1>
            </div>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder={"Enter Email"} value={email} onChange={e => dispatch(setEmail(e.target.value))}/>                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder={"Enter Password"} value={password} onChange={e => dispatch(setPassword(e.target.value))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Terms and conditions" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link to='/login'>Already have an account? </Link>
            
        </>
    )
}

export default Registration


