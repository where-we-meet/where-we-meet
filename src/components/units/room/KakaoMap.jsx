import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map } from 'react-kakao-maps-sdk';
import KakaoMapCircle from './KakaoMapCircle';
import Halfway from './Halfway';
import styles from './KakaoMap.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CenterFlagButton from './CenterFlagButton';
import { setViewPoint, setZoomLevel } from '@/redux/modules/mapSlice';
import RangeLocationSearch from './RangeLocationSearch';
import { useState } from 'react';

function KakaoMap() {
  const [loading, error] = useKakaoLoader();
  const dispatch = useDispatch();

  const zoomLevel = useSelector((state) => state.mapSlice.zoomLevel);
  const viewPoint = useSelector((state) => state.mapSlice.viewPoint);
  const [rangeLocationList, setRangeLocationList] = useState([]);

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
        <RangeLocationSearch rangeLocationList={rangeLocationList} setRangeLocationList={setRangeLocationList} />
        <Halfway />
        <div className={styles.map_footer}>
          <KakaoMapCircle zoomLevel={zoomLevel} />
          <CenterFlagButton />
        </div>
        <div>
          {rangeLocationList.map((spot) => (
            <div key={spot.id}>
              <h3>{spot.place_name}</h3>
              <p>{spot.category_group_name}</p>
              <p>주소: {spot.road_address_name}</p>
            </div>
          ))}
        </div>
      </Map>
    </>
  );
}

export default KakaoMap;
