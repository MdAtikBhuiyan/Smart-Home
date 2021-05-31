import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ManageDeviceDetails = ({devices}) => {
    const { title, price, version, _id } = devices;

    const deleteDevice = (id) => {

        fetch(`https://afternoon-wildwood-65572.herokuapp.com/deleteDevice/${id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            if(result){
               console.log('delete_success');
            }
        })
    }

    return (

        <tr>
            <td>{title}</td>
            <td>{version}</td>
            <td>$ {price}</td>
            <td>
                <button onClick={() => deleteDevice(_id)} className='btn delete-btn'>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>

    );
};

export default ManageDeviceDetails;