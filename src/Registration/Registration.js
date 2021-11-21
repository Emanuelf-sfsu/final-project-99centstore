import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setEmail, setPassword, registerUser } from '../redux/actions/userActions';


const Registration = () => {
    useSelector(state => console.log(state));
    const dispatch = useDispatch();
    const email = useSelector(state => state.userReducer.email);
    const password = useSelector(state => state.userReducer.password);
    return (
        <>

            <div className="registration-logo">
                <h1>Register</h1>
            </div>
            <Form onSubmit={() => dispatch(registerUser())}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder={email} onChange={e => dispatch(setEmail(e.target.value))}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder={password} onChange={e => dispatch(setPassword(e.target.value))}/>
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


