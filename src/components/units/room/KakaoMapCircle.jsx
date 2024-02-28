import { useState } from 'react';
import { Circle } from 'react-kakao-maps-sdk';
import styles from './KakaoMapCircle.module.css';
import { useSelector } from 'react-redux';

const RADIUS_MAXRANGE = [50, 100, 250, 400, 700, 2000, 5000, 8000, 10000];

function KakaoMapCircle({ zoomLevel }) {
  const [radius, setRadius] = useState(0);
  const center = useSelector((state) => state.mapSlice.centerPoint);

  const handleChangeRange = (e) => {
    setRadius(e.target.value);
  };

  return (
    <>
      <Circle
        center={center}
        radius={radius}
        strokeWeight={3}
        strokeColor={'#000000'}
        strokeOpacity={0.2}
        strokeStyle={'solid'}
        fillColor={'#00a0e9'}
        fillOpacity={0.2}
      />
      <div className={styles.map_control}>
        <input
          type="range"
          min={0}
          max={RADIUS_MAXRANGE[Math.min(zoomLevel, 8)]}
          value={radius}
          onChange={handleChangeRange}
        ></input>
        반경 {radius}m<button onClick={() => setRadius(0)}>범위 지우기!</button>
      </div>
    </>
  );
}

export default KakaoMapCircle;
