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

  const handleOnKeywordChange = (event) => {
    event.stopPropagation();
    setSearchKeyword(event.target.value);
  };

  const handleKeywordSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const [place] = placeList;
    dispatch(setViewPoint(changeAxiosToViewPoint(place)));
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
  }, [searchKeyword]);

  useEffect(() => {
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

  const handleChangeViewPoint = (place) => {
    dispatch(setViewPoint(changeAxiosToViewPoint(place)));
  };

  const updateLocation = async (place) => {
    const userInfo = persist.get('userInfo');

    if (!userInfo) {
      alert('로그인 후 이용해주세요.');
      return;
    }

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
