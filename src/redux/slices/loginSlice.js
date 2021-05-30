import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        option: 'login',
        name: '',
        email: '',
        isSignedIn: false,
        error: ''
    },
    reducers: {
        setOption: (state, action) => {
            state.option = action.payload
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

export const { setOption, setUser} = loginSlice.actions

export default loginSlice.reducer