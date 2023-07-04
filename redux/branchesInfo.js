import { createAction, createReducer } from '@reduxjs/toolkit';

export const setBranches = createAction('SET_BRANCHES');

const initialState = [{
  id: '',
  name: '',
  direction: '',
  email: '',
  maxCap: 0,
  phoneNumber: 0,
  openingH: "",
  closingH: "",
}];

const reducer = createReducer(initialState, {
  [setBranches]: (state, action) => {
    return  action.payload },
});

export default reducer;