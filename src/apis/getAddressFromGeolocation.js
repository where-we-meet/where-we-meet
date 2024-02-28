import axios from 'axios';

export const convertToAddress = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/geo/coord2address',
  headers: { Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}` }
});
