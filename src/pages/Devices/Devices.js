import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import ShowDevices from '../../components/ShowDevices';
import house from '../../images/house.jpg';
import './Devices.css';
import { showDevice } from './../../redux/slices/adminSlice';

const Devices = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showDevice())
    }, [])
    
    const devices = useSelector(state => state.adminReducer.deviceList)
    console.log('devices', devices);
    return (
        <div className='devices-area'>
            <Header></Header>
            <Container>
                <Row className='my-4'>
                    <Col md={3}>
                        <div className="house">
                            <img src={house} alt="" />
                        </div>
                    </Col>
                    <Col md={9}>
                        <h3 className='d-title'>Devices</h3>
                        <div className="devices">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Device</th>
                                        <th>Name</th>
                                        <th>Buy Now</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        devices.map(device => <ShowDevices devices={device} key={device._id} />)
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Devices;