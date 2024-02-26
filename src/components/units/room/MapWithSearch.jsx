import { client } from '@/utils/getKeywordSearchList';
import { useEffect, useState } from 'react';
import style from './MapWithSearch.module.css';

function MapWithSearch() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeList, setPlaceList] = useState([]);

  const handleOnKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handlePostLocationData = async () => {
    console.log('Sending location data...');
  };
  const handleKeywordSubmit = async (event) => {
    event.preventDefault();
    try {
      if (searchKeyword === '') return;
      const resultList = await client.get('', {
        params: {
          query: searchKeyword // 검색 키워드를 쿼리로 추가
        }
      });
      setPlaceList(resultList.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetMyLocation = (event, { lat, lng }) => {
    event.preventDefault();
  };

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
    //handleUpdateLocation
    const id = setTimeout(handlePostLocationData, 3 * 1000);
    return () => {
      clearInterval(id);
    };
  }, [searchKeyword]);

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
            <button onClick={handleSetMyLocation({ lat: place.y, lng: place.x })}>이 위치로 지정</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MapWithSearch;
