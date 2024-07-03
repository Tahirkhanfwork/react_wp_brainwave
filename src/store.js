import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;