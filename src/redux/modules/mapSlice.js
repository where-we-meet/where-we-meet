import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  radius: 0
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCircleRadius: (state, action) => {
      state.radius = action.payload;
    }
  }
});

export const { setCircleRadius } = mapSlice.actions;
export default mapSlice.reducer;
