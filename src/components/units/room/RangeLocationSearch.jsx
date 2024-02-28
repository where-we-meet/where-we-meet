import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import convertGeolocationToAddress from '@/utils/convertGeolocationToAddress';

function RangeLocationSearch() {
  const radius = useSelector((state) => state.rangeSlice.range);
  const center = useSelector((state) => state.mapSlice.centerPoint);
  const [rangeLocationList, setRangeLocationList] = useState([]);

  const getRangeLocationList = async () => {
    try {
      if (center === null) return;
      const { lng, lat } = center;
      const [result] = await convertGeolocationToAddress(center);
      const address = result.road_address.address_name;
      const resultList = await client.get('', {
        params: {
          query: address,
          x: lng,
          y: lat,
          radius: radius
        }
      });
      setRangeLocationList(resultList.data.documents);
      console.log(rangeLocationList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRangeLocationList();
  }, [radius]);

  return <></>;
}

export default RangeLocationSearch;

//  1. 범위 내 장소 리스트 받아오기
//    - 중심 좌표 받아오기
//    - 범위 받아오기
//    - 좌표로 주소 변환하기
//    - 변환한 주소 기반으로 키워드로 장소 검색하기 API 사용하여 요청
//    - 받아온 장소 리스트를 지역 상태로 관리
//  2. 장소 리스트들에 대한 마커 생성하기
//  3. 마커 표시하기
