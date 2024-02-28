import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  range: 0
};

const rangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setRange: (state, action) => {
      state.range = action.payload;
    }
  }
});

export const { setRange } = rangeSlice.actions;
export default rangeSlice.reducer;
