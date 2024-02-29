import { client } from '@/apis/keywordSearchListAPI';
import { useEffect, useState } from 'react';
import styles from './MapWithSearch.module.css';
import { FaSearch } from 'react-icons/fa';
import persist from '@/utils/persist';
import * as roomApi from '@/apis/roomApi';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { useDispatch } from 'react-redux';
import { setViewPoint } from '@/redux/modules/mapSlice';

const IDLE_TIME_MS = 3000;

function MapWithSearch() {
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeList, setPlaceList] = useState([]);

  const patchUserLocation = useCustomMutation(roomApi.updateLocation);

  const [interactionState, setInteractionState] = useState({
    inputFocused: false,
    containerHovered: false
  });

  const handleInputFocus = () => {
    setInteractionState({ ...interactionState, inputFocused: true });
  };

  const handleInputBlur = () => {
    setInteractionState({ ...interactionState, inputFocused: false });
  };

  const handleContainerMouseEnter = (event) => {
    event.stopPropagation();
    setInteractionState({ ...interactionState, containerHovered: true });
  };

  const handleContainerMouseLeave = (event) => {
    event.stopPropagation();
    setInteractionState({ ...interactionState, containerHovered: false });
  };

  // 검색어 입력 중
  const handleOnKeywordChange = (event) => {
    event.stopPropagation();
    setSearchKeyword(event.target.value);
  };

  //검색어 입력 완료 후
  const handleKeywordSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const [place] = placeList;
    dispatch(setViewPoint(changeAxiosToViewPoint(place)));
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
    const id = setTimeout(handleAutoChangeViewPoint, IDLE_TIME_MS);
    return () => {
      clearInterval(id);
    };
  }, [placeList]);

  const changeAxiosToViewPoint = (place) => {
    return { name: place.place_name, lat: +place.y, lng: +place.x };
  };

  const handleAutoChangeViewPoint = () => {
    if (placeList.length === 0) return;
    const [place] = placeList;
    handleChangeViewPoint(place);
  };
  //viewpoint 변경 (state update)
  const handleChangeViewPoint = (place) => {
    dispatch(setViewPoint(changeAxiosToViewPoint(place)));
  };

  const updateLocation = async (place) => {
    // 사용자 정보 확인
    const userInfo = persist.get('userInfo');

    // 사용자 정보가 없는 경우 알림 후 종료
    if (!userInfo) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    // 사용자 정보 업데이트
    const updatedUserInfo = {
      ...userInfo,
      location: changeAxiosToViewPoint(place)
    };

    patchUserLocation(updatedUserInfo);
  };

  const handleSetMyLocation = async (place) => {
    await updateLocation(place);
  };

  const activatePlaceList =
    (placeList.length > 0 && interactionState.inputFocused && searchKeyword !== '') ||
    interactionState.containerHovered;
  return (
    <>
      <form className={styles.form} onSubmit={handleKeywordSubmit}>
        <input
          id="search-form"
          placeholder="내 위치 등록하기"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchKeyword}
          onChange={handleOnKeywordChange}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      {activatePlaceList ? (
        <div
          className={styles.places_container}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
        >
          <ul>
            {placeList.map((place) => (
              <li
                key={place.id}
                onClick={() => {
                  handleChangeViewPoint(place);
                }}
              >
                <p className={styles.place_name}>{place.place_name}</p>
                <p className={styles.road_address_name}>{place.road_address_name}</p>
                <p className={styles.category_group_name}>{place.category_group_name}</p>
                <button
                  onClick={() => {
                    handleSetMyLocation(place);
                  }}
                  onTouchEnd={() => {
                    handleSetMyLocation(place);
                  }}
                >
                  이 위치로 지정
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default MapWithSearch;
