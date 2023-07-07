import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  DNI: 0,
  phoneNumber: 0,
  bookings: [],
};

const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
    const name = action.payload.name;
    const lastname = action.payload.lastname;
    const DNI = action.payload.DNI;
    const id = action.payload.id;
    const email = action.payload.email;
    const phoneNumber = action.payload.phoneNumber;
    const bookings = action.payload.bookings;
    return {
      name: name,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      DNI: DNI,
      id: id,
      bookings: bookings,
    };
  },
});

export default reducer;
