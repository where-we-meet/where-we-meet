import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';
import { useSelector } from 'react-redux';
import CenterFlagButton from './CenterFlagButton';

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
        <div className={styles.map_footer}>
          <KakaoMapCircle zoomLevel={zoomLevel} />
          <CenterFlagButton />
        </div>
      </Map>
    </>
  );
}

export default KakaoMap;
