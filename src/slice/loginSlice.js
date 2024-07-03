import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    jwt_token: localStorage.getItem('jwt_token') || '',
    expiration_time: localStorage.getItem('expiration_time') ? parseInt(localStorage.getItem('expiration_time')) : null,
  },
  reducers: {
    login: (state, action) => {
      state.jwt_token = action.payload.jwt_token;
      state.expiration_time = action.payload.expiration_time;
      localStorage.setItem('jwt_token', action.payload.jwt_token);
      localStorage.setItem('expiration_time', action.payload.expiration_time.toString());
    },
    logout: (state) => {
      state.jwt_token = '';
      state.expiration_time = null;
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('expiration_time');
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
