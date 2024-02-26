import { client } from '@/utils/getKeywordSearchList';
import { useEffect, useState } from 'react';

function MapWithSearch() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleOnKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
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
      console.log(resultList.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        if (searchKeyword === '') return;
        const resultList = await client.get('', {
          params: {
            query: searchKeyword // 검색 키워드를 쿼리로 추가
          }
        });
        console.log(resultList);
      } catch (error) {
        console.error(error);
      }
    };

    getSearchResult();
  }, [searchKeyword]); // searchKeyword가 변경될 때마다 실행되도록 useEffect 의존성 배열에 추가

  return (
    <>
      <form onSubmit={handleKeywordSubmit}>
        <input id="search-form" placeholder="내 위치 등록하기" value={searchKeyword} onChange={handleOnKeywordChange} />
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default MapWithSearch;
