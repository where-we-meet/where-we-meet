import { MapMarker } from 'react-kakao-maps-sdk';
import pin from '@assets/icons/map-pin-2-fill.png';
import flag from '@assets/icons/flag-line.png';
import calcCenterPoint from '@/utils/calcCenterPoint';
import convexHull from '@/utils/convexHull';

const Halfway = ({ markers }) => {
  const sortedMarkers = convexHull(markers);
  const halfwayPoint = calcCenterPoint(sortedMarkers);
  return (
    <>
      {markers.map((marker) => (
        <MapMarker
          key={`${marker.lat}-${marker.lng}`}
          position={marker}
          image={{
            src: pin,
            size: {
              width: 15,
              height: 15
            },
            options: {
              offset: {
                x: 8,
                y: 16
              }
            }
          }}
        />
      ))}
      <MapMarker
        key={'halfway'}
        position={halfwayPoint}
        image={{
          src: flag,
          size: {
            width: 20,
            height: 20
          },
          options: {
            offset: {
              x: 8,
              y: 16
            }
          }
        }}
      />
    </>
  );
};

export default Halfway;
