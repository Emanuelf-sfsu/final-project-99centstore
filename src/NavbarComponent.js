import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from './redux/actions/userActions';

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.userReducer.isAdmin);

    return (
        <Navbar bg="light" expand="lg" style={{ width: "100%" }}>
            <Container>
                <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></Navbar.Brand>
                {isAdmin && <Navbar.Brand ><Link to="/createListing" style={{ textDecoration: 'none' }}>Create Listing</Link></Navbar.Brand>}
                <Navbar.Brand ><Link to="/registration" style={{ textDecoration: 'none' }}>Register</Link></Navbar.Brand>
                <Navbar.Brand ><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></Navbar.Brand>
                <Navbar.Brand >99 Cent Store</Navbar.Brand>
                <Button onClick={() => dispatch(setAdmin())}>Set Admin</Button>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;
