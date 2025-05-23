import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/login';
import pollReducer from '../reducers/poll';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    poll: pollReducer
  },
});
