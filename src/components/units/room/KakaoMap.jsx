import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CenterFlagButton from './CenterFlagButton';
import { setViewPoint, setZoomLevel } from '@/redux/modules/mapSlice';
import RangeLocationSearch from './RangeLocationSearch';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const dispatch = useDispatch();

  const zoomLevel = useSelector((state) => state.mapSlice.zoomLevel);
  const viewPoint = useSelector((state) => state.mapSlice.viewPoint);

  const handleViewPoint = (map) => {
    const latlng = map.getCenter();
    const currentLatLng = { lat: latlng.getLat(), lng: latlng.getLng() };
    dispatch(setViewPoint(currentLatLng));
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Map
        center={viewPoint}
        className={styles.map}
        level={zoomLevel}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          dispatch(setZoomLevel(level));

          handleViewPoint(map);
        }}
        onDragEnd={(map) => {
          handleViewPoint(map);
        }}
      >
        <RangeLocationSearch />
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
