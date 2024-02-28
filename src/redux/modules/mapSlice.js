import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewPoint: { lat: 33.5563, lng: 126.79581 },
  centerPoint: { lat: 33.5563, lng: 126.79581 }
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setViewPoint: (state, action) => {
      state.viewPoint = action.payload;
    },
    setCenterPoint: (state, action) => {
      state.centerPoint = action.payload;
    }
  }
});

export const { setViewPoint, setCenterPoint } = mapSlice.actions;
export default mapSlice.reducer;
