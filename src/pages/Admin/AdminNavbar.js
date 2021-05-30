import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddDevices from './AddDevices';
import ManageDevice from './ManageDevice';
import logo from '../../images/sign.png';

const AdminNavbar = () => {
    const { url, path } = useRouteMatch();
    return (
        <div className='admin-nav-area'>
            <Row>
                <Col md={4} className='margin'>

                    <div className="nav-area">
                        <Link to="/devices" className='navbar-brand'>
                            Smart Home
                            <span><img src={logo} alt="" /></span>
                        </Link>
                        <Nav className="flex-column mt-4">
                            <Link to={`${url}/addDevice`} className='nav-link'>
                                <FontAwesomeIcon icon={faPlus} className='mr-2' /> Add Device
                            </Link>
                            <Link to={`${url}/manageDevice`} className='nav-link'>
                                <FontAwesomeIcon icon={faThLarge} className='mr-2' /> Manage Device
                            </Link>
                        </Nav>
                    </div>

                </Col>

                <Col md={8} className='margin'>

                    <Switch>

                        <Route path={`${path}/addDevice`}>
                            <AddDevices></AddDevices>
                        </Route>
                        <Route path={`${path}/manageDevice`}>
                            <ManageDevice></ManageDevice>
                        </Route>

                        <Route exact path={path}>
                            <AddDevices></AddDevices>
                        </Route>

                    </Switch>
                </Col>
            </Row>
        </div>
    );
};

export default AdminNavbar;