import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  second: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state) => {
      state.second = state.second + 1;
    },
    decrease: (state) => {
      state.second = state.second - 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
