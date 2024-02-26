// import React, { useState } from "react";
// import { Map, Marker } from "react-kakao-maps";
// import { Places } from "kakao.maps";

// function MapWithSearch() {
//   const [keyword, setKeyword] = useState("");
//   const [places, setPlaces] = useState([]);
//   const [pagination, setPagination] = useState(null);

//   const handleKeywordChange = (e) => {
//     setKeyword(e.target.value);
//   };

//   const handleSearch = () => {
//     if (!keyword.trim()) {
//       alert("키워드를 입력해주세요!");
//       return;
//     }
//     const ps = new Places();
//     ps.keywordSearch(keyword, placesSearchCB);
//   };

//   const placesSearchCB = (data, status, pagination) => {
//     if (status === "OK") {
//       setPlaces(data);
//       setPagination(pagination);
//     } else if (status === "ZERO_RESULT") {
//       alert("검색 결과가 존재하지 않습니다.");
//     } else if (status === "ERROR") {
//       alert("검색 결과 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={keyword} onChange={handleKeywordChange} />
//       <button onClick={handleSearch}>검색</button>
//       <div id="map" style={{ width: "500px", height: "400px" }}>
//         <Map center={{ lat: 37.566826, lng: 126.9786567 }} level={3}>
//           {places.map((place, index) => (
//             <Marker key={index} position={{ lat: place.y, lng: place.x }} />
//           ))}
//         </Map>
//       </div>
//       <ul>
//         {places.map((place, index) => (
//           <li key={index}>
//             <span>{place.place_name}</span>
//             {place.road_address_name && <span>{place.road_address_name}</span>}
//             <span>{place.address_name}</span>
//             <span>{place.phone}</span>
//           </li>
//         ))}
//       </ul>
//       <div id="pagination">{/* 페이지네이션 */}</div>
//     </div>
//   );
// }

// export default MapWithSearch;
