import axios from 'axios';

export const setUserLocation = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});
