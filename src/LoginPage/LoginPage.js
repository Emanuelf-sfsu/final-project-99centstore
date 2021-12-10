import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setEmail, setPassword } from '../redux/actions/userActions'
const LoginPage = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.userReducer.email);
    const password = useSelector(state => state.userReducer.password);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser());
    }
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default LoginPage;
