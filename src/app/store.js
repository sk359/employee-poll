import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/login';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
