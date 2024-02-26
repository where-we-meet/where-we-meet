import { useState } from 'react';
import { Circle } from 'react-kakao-maps-sdk';

const RADIUS_MAXRANGE = [50, 100, 250, 400, 700, 2000, 5000, 8000, 10000, 10000];

function KakaoMapCircle({ center = { lat: 33.5563, lng: 126.79581 }, zoomLevel }) {
  const [radiusPercent, setRadiusPercent] = useState(0);
  const radius = (radiusPercent * RADIUS_MAXRANGE[zoomLevel <= RADIUS_MAXRANGE.length ? zoomLevel : 9]) / 100;
  const drawingCircleData = { center, radius };

  const handleChangeRange = (e) => {
    setRadiusPercent(e.target.value);
  };

  return (
    <>
      <Circle
        center={drawingCircleData.center}
        radius={drawingCircleData.radius}
        strokeWeight={3}
        strokeColor={'#000000'}
        strokeOpacity={0.2}
        strokeStyle={'solid'}
        fillColor={'#00a0e9'}
        fillOpacity={0.2}
      />
      <div>
        <input type="range" min={0} max={100} value={radiusPercent} onChange={handleChangeRange}></input>
        반경 {radius}m
      </div>
      <button onClick={() => setRadiusPercent(0)}>범위 지우기!</button>
    </>
  );
}

export default KakaoMapCircle;
