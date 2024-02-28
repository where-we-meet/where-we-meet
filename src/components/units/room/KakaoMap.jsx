import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';

function KakaoMap({ viewPoint }) {
  const [loading, error] = useKakaoLoader();
  const [zoomLevel, setZoomLevel] = useState(3);

  if (loading) return <div>Loading</div>;

  return (
    <>
      <Map
        center={viewPoint}
        className={styles.map}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          setZoomLevel(level);
        }}
      >
        <Halfway />
        <KakaoMapCircle center={viewPoint} zoomLevel={zoomLevel} />
      </Map>
    </>
  );
}

export default KakaoMap;
