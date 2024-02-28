import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CenterFlagButton from './CenterFlagButton';
import { setViewPoint } from '@/redux/modules/mapSlice';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const [zoomLevel, setZoomLevel] = useState(3);
  const dispatch = useDispatch();

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
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          const currentLatLng = { lat: latlng.getLat(), lng: latlng.getLng() };
          dispatch(setViewPoint(currentLatLng));
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
