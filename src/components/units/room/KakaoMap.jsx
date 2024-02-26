import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const [zoomLevel, setZoomLevel] = useState(3);

  if (loading) return <div>Loading</div>;

  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '360px' }}
      onZoomChanged={(map) => {
        const level = map.getLevel();
        setZoomLevel(level);
      }}
    >
      <KakaoMapCircle zoomLevel={zoomLevel} />
    </Map>
  );
}

export default KakaoMap;
