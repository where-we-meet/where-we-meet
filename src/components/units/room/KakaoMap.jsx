import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';
import { useSelector } from 'react-redux';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const [zoomLevel, setZoomLevel] = useState(3);

  const viewPoint = useSelector((state) => state.mapSlice.viewPoint);

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
        <KakaoMapCircle zoomLevel={zoomLevel} />
      </Map>
    </>
  );
}

export default KakaoMap;
