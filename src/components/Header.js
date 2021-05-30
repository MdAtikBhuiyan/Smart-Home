import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/sign.png'
import { useSelector } from 'react-redux';

const Header = () => {
    const user = useSelector(state => state.loginReducer)
    console.log(user)
    return (
        <Container>
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to="/devices">
                    Smart Home
                    <span><img src={logo} alt="" /></span>
                </Navbar.Brand>

                <Navbar.Toggle>
                    <FontAwesomeIcon icon={faBars} />
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/devices" className='nav-link'>Devices</Link>
                        <Link to="/myDevice" className='nav-link'>My Devices</Link>
                        <Link to="/admin" className='nav-link'> Admin </Link>


                        {
                            user.isSignedIn ?
                                <Link to="/login" className='nav-link btn btn-primary px-4 mr-0 log-btn'>{user?.name} </Link>
                                :
                                <Link to="/login" className='nav-link btn btn-primary px-4 mr-0 log-btn'>Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;