import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  center: null,
  radius: 0
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCircleRadius: (state, action) => {
      state.radius = action.payload;
    },
    setCenterPoint: (state, action) => {
      state.center = action.payload;
    }
  }
});

export const { setCircleRadius, setCenterPoint } = mapSlice.actions;
export default mapSlice.reducer;
