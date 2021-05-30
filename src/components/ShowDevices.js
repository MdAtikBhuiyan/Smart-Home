import React from 'react';
import { useHistory } from 'react-router';

const ShowDevices = ({ devices }) => {
    const { title, price, img, _id } = devices;
    let history = useHistory()
    const handleBuy = (id) => {
        history.push(`/payment/${id}`)
    }
      
    return (
        <tr className='text-capitalize show-devices'>
            <td> <img src={img} alt="" /> </td>
            <td> {title} </td>
            <td>
                <button onClick={() => handleBuy(_id)} className='btn btn-primary col'>Buy Now</button>
            </td>
            <td>$ {price}</td>
        </tr>
    );
};

export default ShowDevices;