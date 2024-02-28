import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import pin from '@assets/icons/map-pin-2-fill.png';
import style from './RangeLocationSearch.module.css';

function RangeLocationSearch({ rangeLocationList, setRangeLocationList }) {
  const radius = useSelector((state) => state.rangeSlice.range);
  const center = useSelector((state) => state.mapSlice.centerPoint);
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

  return (
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
              <div className={style.spot_info}>
                <h3>{selectedSpot.place_name}</h3>
                <p>{selectedSpot.category_group_name}</p>
                <p>주소: {selectedSpot.road_address_name}</p>
              </div>
            )}
          </MapMarker>
        </div>
      ))}
    </div>
  );
}

export default RangeLocationSearch;
