import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './redux/actions/userActions';

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.userReducer.isAdmin);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

    return (
        <Navbar bg="light" expand="lg" style={{ width: "100%" }}>
            <Container>
                <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></Navbar.Brand>
                {isAdmin && <Navbar.Brand ><Link to="/createListing" style={{ textDecoration: 'none' }}>Create Listing</Link></Navbar.Brand>}
                {isLoggedIn ? 
                <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none' }} onClick={() => dispatch(logoutUser())}>Logout</Link></Navbar.Brand> : 
                <><Navbar.Brand ><Link to="/registration" style={{ textDecoration: 'none' }}>Register1</Link></Navbar.Brand>   
                <Navbar.Brand ><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></Navbar.Brand> </>}
                <Navbar.Brand >99 Cent Store</Navbar.Brand>
                {/* <Button onClick={() => dispatch(setAdmin())}>Set Admin</Button> */}
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;
