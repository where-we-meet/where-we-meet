import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import pin from '@assets/icons/map-pin-2-fill.png';
import style from './RangeLocationSearch.module.css';

function RangeLocationSearch() {
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

//  1. 범위 내 장소 리스트 받아오기
//    - 중심 좌표 받아오기 (ok)
//    - 범위 받아오기 (ok)
//    - 좌표로 주소 변환하기 (ok)
//    - 변환한 주소 기반으로 키워드로 장소 검색하기 API 사용하여 요청 (ok)
//    - 받아온 장소 리스트를 지역 상태로 관리 (ok)
//  2. 장소 리스트들에 대한 마커 생성하기
//  3. 마커 표시하기

{
  /* <div className={style.spot_info}>
  <h3>{spot.place_name}</h3>
  <p>{selectedSpot.category_group_name}</p>
  <p>주소: {spot.road_address_name}</p>
</div>; */
}

// TO-DO : rangeLocationList를 지도 footer 하단에 보이도록 수정해야함.
