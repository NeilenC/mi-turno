import { createAction, createReducer } from '@reduxjs/toolkit';

const setUserInfo = createAction('SET_USERINFO');

const initialState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  DNI: 0,
  phoneNumber: 0,
  bookings: [],
};

export const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
    const name = action.payload.name;
    const lastName = action.payload.lastName;
    const DNI = action.payload.DNI;
    const id = action.payload.id;
    const email = action.payload.email;
    const phoneNumber = action.payload.phoneNumber;
    const bookings = action.payload.bookings;
    return {
      email: email,
      name: name,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      DNI: DNI,
      id: id,
      bookings: bookings,
    };
  },
});

export default reducer;
