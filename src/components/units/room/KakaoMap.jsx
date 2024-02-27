import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import MapWithSearch from './MapWithSearch';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const [zoomLevel, setZoomLevel] = useState(3);
  const [viewPoint, setViewPoint] = useState({ lat: 33.450701, lng: 126.570667 });

  if (loading) return <div>Loading</div>;

  return (
    <>
      <MapWithSearch setViewPoint={setViewPoint} />
      <Map
        center={viewPoint}
        style={{ width: '100%', height: '360px' }}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          setZoomLevel(level);
        }}
      >
        <Halfway />
        <KakaoMapCircle zoomLevel={zoomLevel} />
      </Map>
    </>
  );
}

export default KakaoMap;
