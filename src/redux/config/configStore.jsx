import { configureStore } from '@reduxjs/toolkit';
import mapSlice from '../modules/mapSlice';

const store = configureStore({ reducer: { mapSlice } });

export default store;
