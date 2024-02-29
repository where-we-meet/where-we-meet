import { configureStore } from '@reduxjs/toolkit';
import mapSlice from '../modules/mapSlice';
import rangeSlice from '../modules/rangeSlice';

const store = configureStore({ reducer: { mapSlice, rangeSlice } });

export default store;
