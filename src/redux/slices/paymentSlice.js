import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
    name: 'login',
    initialState: {
        payment: false
    },
    reducers: {
        setPayment: (state, action) => {
            state.payment = action.payload
        },
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isSignedIn = action.payload.isSignedIn;
            state.error = action.payload.error;
            console.log(action.payload.name)
        }
    },
})

export const { setPayment, setUser} = paymentSlice.actions

export default paymentSlice.reducer