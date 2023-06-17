import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfo';
const store = configureStore({
  reducer: {
    userInfo: userInfo,
  },
});

export default store;
