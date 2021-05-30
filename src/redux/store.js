import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slices/adminSlice';
import loginSlice from './slices/loginSlice';
import paymentSlice from './slices/paymentSlice';

const store = configureStore({
  reducer: {
      loginReducer: loginSlice,
      adminReducer: adminSlice,
      paymentReducer: paymentSlice,
  },
})
export default store;