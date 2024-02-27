import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import style from './MapWithSearch.module.css';
import { getRoomData } from '@/apis/roomApi';
import { useParams } from 'react-router-dom';

const IDLE_TIME_MS = 3000;

function MapWithSearch({ setViewPoint }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeList, setPlaceList] = useState([]);
  const { id: roomId } = useParams();

  // 검색어 입력 중
  const handleOnKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  //검색어 입력 완료 후
  const handleKeywordSubmit = async (event) => {
    event.preventDefault();
    const [place] = placeList;
    setViewPoint(changeAxiosToViewPoint(place));
  };

  //검색어 바뀔 때마다 결과 리스트 받아오기
  useEffect(() => {
    const getSearchResult = async () => {
      try {
        if (searchKeyword === '') return;
        const resultList = await client.get('', {
          params: {
            query: searchKeyword
          }
        });
        setPlaceList(resultList.data.documents);
      } catch (error) {
        console.error(error);
      }
    };

    getSearchResult();
  }, [searchKeyword]);

  //3초 간격 안에 이벤트가 없으면 view point 전환
  useEffect(() => {
    //handleUpdateLocation
    const id = setTimeout(handleChangeViewPoint, IDLE_TIME_MS);
    return () => {
      clearInterval(id);
    };
  }, [placeList]);

  const changeAxiosToViewPoint = (place) => {
    return { lat: place.y, lng: place.x };
  };

  //viewpoint 변경 (state update)
  const handleChangeViewPoint = () => {
    const [place] = placeList;
    setViewPoint(changeAxiosToViewPoint(place));
  };

  // 버튼 클릭 시 위치 지정 (db update)
  const handleSetMyLocation = async (place) => {
    const data = await getRoomData(roomId);
    const userLocationInfo = changeAxiosToViewPoint(place);
    //await axios.post();
    setViewPoint();
  };

  return (
    <>
      <form onSubmit={handleKeywordSubmit}>
        <input id="search-form" placeholder="내 위치 등록하기" value={searchKeyword} onChange={handleOnKeywordChange} />
        <button type="submit">검색</button>
      </form>
      <div className={style.places_container}>
        {placeList.map((place) => (
          <div key={place.id} className={style.place_info_container}>
            <p className={style.place_name}>{place.place_name}</p>
            <p className={style.road_address_name}>{place.road_address_name}</p>
            <p className={style.category_group_name}>{place.category_group_name}</p>
            <button
              onClick={() => {
                handleSetMyLocation(place);
              }}
            >
              이 위치로 지정
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MapWithSearch;
