import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/search/keyword',
  headers: { Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}` }
});
