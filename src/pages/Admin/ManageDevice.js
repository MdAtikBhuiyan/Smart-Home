import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ManageDeviceDetails from './../../components/ManageDeviceDetails';
import { useDispatch } from 'react-redux';
import { showDevice } from './../../redux/slices/adminSlice';
import { useSelector } from 'react-redux';

const ManageDevice = () => {
   
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(showDevice())

    }, [dispatch])
const manageDevices = useSelector(state => state.adminReducer.deviceList)

    return (
        <div className="manage-background">
            <h3 className='add-title'>Manage Devices</h3>
            <div className='container'>
                <div className="product-info">
                    <Table hover>
                        <thead>
                            <tr>
                                <th className='border-left-design'>Device Name</th>
                                <th>Version</th>
                                <th>Price</th>
                                <th className='border-right-design'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manageDevices?.map(device => <ManageDeviceDetails devices={device} key={device._id} />)
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );
};

export default ManageDevice;