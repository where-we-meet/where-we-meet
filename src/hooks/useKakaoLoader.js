import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: import.meta.env.VITE_APP_KAKAOMAP_API_KEY,
    libraries: ['clusterer', 'drawing', 'services']
  });
  return [loading, error];
}
