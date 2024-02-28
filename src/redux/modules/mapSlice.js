import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewPoint: { lat: 37.50232593365278, lng: 127.04444559870342 },
  centerPoint: null
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setViewPoint: (state, action) => {
      state.viewPoint = action.payload;
    },
    setCenterPoint: (state, action) => {
      if (action.payload === undefined) return;
      state.centerPoint = action.payload;
    }
  }
});

export const { setViewPoint, setCenterPoint } = mapSlice.actions;
export default mapSlice.reducer;
