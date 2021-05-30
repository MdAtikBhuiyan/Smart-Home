import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        addDevice: {},
        deviceList: [],
        manageDevice: {}
    },
    reducers: {
        setDevice: (state, action) => {
            console.log(action.payload)
        },
        allDevices: (state, action) => {
            state.deviceList = action.payload;
        },
        setManageDevice: (state) => {
            
        }
    },
})

export const { setDevice, allDevices, incrementByAmount } = adminSlice.actions

export const getDevice = (payload) => {
    console.log('add', payload)
    return async (dispatch) => {
        const device = await axios.post('http://localhost:5000/addDevice', payload)
        console.log('add', device)
        dispatch({
            type: setDevice,
            payload: device,
        })
            .then(error => console.log(error))
    }

    // return (dispatch) => {
    //     fetch('http://localhost:5000/addDevice', {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(dispatch(setDevice(payload)))
    //     })
    //     .then(res => console.log("add Product successfully"))
    // }
}


export const showDevice = (payload) => (dispatch) => {
    fetch('http://localhost:5000/showDevices')
        .then(res => res.json())
        .then((data) => dispatch(allDevices(data)))
}


export default adminSlice.reducer