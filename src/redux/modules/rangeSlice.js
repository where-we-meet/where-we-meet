import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  range: 50,
  locationList: []
};

const rangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setRange: (state, action) => {
      state.range = action.payload;
    },
    setLocationList: (state, action) => {
      state.locationList = action.payload;
    }
  }
});

export const { setRange, setLocationList } = rangeSlice.actions;
export default rangeSlice.reducer;
