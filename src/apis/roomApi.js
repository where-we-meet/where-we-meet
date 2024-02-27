import axios from 'axios';

const roomApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});

roomApi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

roomApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export const createRoom = async (roomName) => {
  const response = await roomApi.post('/rooms', { roomName });
  return response.data;
};

export const getRoomData = async (id) => {
  const response = await roomApi.get(`/rooms/${id}?_embed=users`);
  return response.data;
};

export const createUser = async (userInfo) => {
  const response = await roomApi.post('/users', userInfo);
  return response.data;
};

export default roomApi;
