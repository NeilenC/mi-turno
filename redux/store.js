import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userInfo";
import setBranches from "./branchesInfo";
const store = configureStore({
  reducer: {
    user: userInfo,
    branches: setBranches,
  },
});

export default store;
