import { MapMarker, Polygon } from "react-kakao-maps-sdk";

function calcCenter(markers) {
  let x = 0;
  let y = 0;
  let s = 0;

  for (let i = 0; i < markers.length; i++) {
    let j = (i + 1) % markers.length;

    x +=
      (markers[i].lat + markers[j].lat) *
      (markers[i].lat * markers[j].lng - markers[j].lat * markers[i].lng);
    y +=
      (markers[i].lng + markers[j].lng) *
      (markers[i].lat * markers[j].lng - markers[j].lat * markers[i].lng);
    s += markers[i].lat * markers[j].lng - markers[j].lat * markers[i].lng;
  }
  s /= 2;
  x = x / (6 * s);
  y = y / (6 * s);
  return { lat: x, lng: y };
}

const Halfway = ({ markers }) => {
  const halfwayPoint = calcCenter(markers);
  return (
    <>
      {markers.map((marker) => (
        <MapMarker
          key={`${marker.lat}-${marker.lng}`}
          position={marker}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: {
              width: 24,
              height: 35,
            },
          }}
        />
      ))}
      <MapMarker
        key={"halfway"}
        position={halfwayPoint}
        image={{
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          size: {
            width: 24,
            height: 35,
          },
        }}
      >
        {"1"}
      </MapMarker>
      <Polygon
        path={markers.map((marker) => marker)}
        strokeWeight={1} // 선의 두께입니다
        strokeColor={"#39DE2A"} // 선의 색깔입니다
        strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
        fillColor={"#A2FF99"} // 채우기 색깔입니다
        fillOpacity={0.7}
      />
    </>
  );
};

export default Halfway;
