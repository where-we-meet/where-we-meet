import axios from 'axios';

export const jsonDB = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});
