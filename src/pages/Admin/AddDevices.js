import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getDevice } from '../../redux/slices/adminSlice';
import './Admin.css';
import { loadBookAsync } from './../../redux/slices/adminSlice';

const AddDevices = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imgUrl, setImgUrl] = useState(null);
    const dispatch = useDispatch();

    const imageUpload = (e) => {

        console.log(e.target.files);

        const imgData = new FormData();
        // imgData.set('key', 'eedf45f5159b6e8f0f23e26c24c443e0');
        imgData.append('image', e.target.files[0]);
        console.log('object', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload?key=eedf45f5159b6e8f0f23e26c24c443e0',
            imgData)
            .then(response => {
                console.log('upload done', response);
                setImgUrl(response.data.data.display_url);
                console.log(response.data.data.display_url);
            })
            .catch(error=> console.log(error));
    }

    const onSubmit = data => {
        const devicesInfo = {
            title: data.deviceName,
            price: data.devicePrice,
            version: data.deviceVersion,
            img: imgUrl,
        }
        console.log(devicesInfo);
        dispatch(getDevice(devicesInfo))

        // fetch('https://afternoon-wildwood-65572.herokuapp.com/addDevice', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(devicesInfo)
        // })
        // .then(res => console.log("add Product successfully"))

    };

    return (
        <sction>
            <div className="form-area">
                <h4 className='add-title'> Add Product </h4>
                <div className='form-section'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label>Device Name</label>
                        <input
                            className='form-control' placeholder='Device Name'
                            {...register("deviceName", { required: true })} />
                        <p style={{ color: '#ff0052' }}>{errors.deviceName && "Reuired"}</p>

                        <label>Device Price</label>
                        <input
                            type='number' className='form-control' placeholder='Device Price'
                            {...register("devicePrice", { required: true })} />
                        <p style={{ color: '#ff0052' }}>{errors.devicePrice && "Reuired"}</p>

                        <label>Device Version</label>
                        <input
                            className='form-control' placeholder='Device Version'
                            {...register("deviceVersion", { required: true })} />
                        <p style={{ color: '#ff0052' }}>{errors.deviceVersion && "Reuired"}</p>

                        <label>Device Image</label>
                        <input type='file' name="exampleRequired" onChange={imageUpload} className='fileUpload d-block' />

                        <input type="submit" className='btn btn-success px-5 py-2 mt-4' value='Save' />
                    </form>
                </div>
            </div>
        </sction>
    );
};

export default AddDevices;