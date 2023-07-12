import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  DNI: 0,
  phoneNumber: 0,
  isOp: false,
  isAdmin: false,
  branchId: null,
  branchName: null,
};

const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
    const {
      name,
      lastname,
      DNI,
      id,
      email,
      phoneNumber,
      isOp,
      isAdmin,
      branchId,
      branchName,
    } = action.payload;
    return {
      ...state,
      name,
      lastname,
      email,
      phoneNumber,
      DNI,
      id,
      isOp,
      isAdmin,
      branchId,
      branchName,
    };
  },
});

export default reducer;
