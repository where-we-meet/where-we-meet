import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import pin from '@assets/icons/pin7.svg';
import styles from './RangeLocationSearch.module.css';
import { setViewPoint, setZoomLevel } from '@/redux/modules/mapSlice';

function RangeLocationSearch() {
  const dispatch = useDispatch();

  const radius = useSelector((state) => state.rangeSlice.range);
  const center = useSelector((state) => state.mapSlice.centerPoint);

  const [rangeLocationList, setRangeLocationList] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const showSpotInfo = (spot) => {
    setSelectedSpot(spot);
  };

  const getRangeLocationList = async () => {
    try {
      if (center === null) return;
      const { lng, lat } = center;
      const resultList = await client.get('', {
        params: {
          query: '카페',
          x: '' + lng,
          y: '' + lat,
          radius: radius
        }
      });
      setRangeLocationList(resultList.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRangeLocationList();
  }, [radius]);

  const handleClickResult = (x, y) => {
    dispatch(setViewPoint({ lat: y, lng: x }));
    dispatch(setZoomLevel(1));
  };

  return (
    <>
      <div>
        {rangeLocationList.map((spot) => (
          <div key={spot.id}>
            <MapMarker
              position={{ lng: spot.x, lat: spot.y }}
              image={{
                src: pin,
                size: {
                  width: 15,
                  height: 15
                },
                options: {
                  offset: {
                    x: 8,
                    y: 16
                  }
                }
              }}
              onMouseOver={() => showSpotInfo(spot)}
            >
              {selectedSpot && selectedSpot.id === spot.id && (
                <div className={styles.spot_info}>
                  <h3>{selectedSpot.place_name}</h3>
                  <p>{selectedSpot.category_group_name}</p>
                  <p>주소: {selectedSpot.road_address_name}</p>
                </div>
              )}
            </MapMarker>
          </div>
        ))}
      </div>
      {rangeLocationList.length > 0 ? (
        <section>
          <h2 id="list" className={styles.spots_container_title}>
            <a href="#list">범위 내 장소 목록</a>
          </h2>
          <ul className={styles.spots_container}>
            {rangeLocationList.map((spot) => (
              <li
                key={spot.id}
                className={styles.spot_info_container}
                onClick={() => handleClickResult(spot.x, spot.y)}
              >
                <h3>{spot.place_name}</h3>
                <p>{spot.category_group_name}</p>
                <p>주소: {spot.road_address_name}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

export default RangeLocationSearch;
