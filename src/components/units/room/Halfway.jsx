import { MapMarker, Polygon } from 'react-kakao-maps-sdk';
import pin from '@assets/icons/map-pin-2-fill.png';
import flag from '@assets/icons/flag-line.png';
import calcCenterPoint from '@/utils/calcCenterPoint';
import convexHull from '@/utils/convexHull';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomQuery } from '@/hooks/useRoomQuery';

const Halfway = () => {
  const { id } = useParams();
  const {
    data: { users },
    isLoading
  } = useRoomQuery(id);

  const [usersData, setUsersData] = useState(users);

  const sortedMarkers = convexHull(usersData.filter((user) => user.location !== undefined));
  const halfwayPoint = calcCenterPoint(sortedMarkers);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  console.log(sortedMarkers);

  if (isLoading) return <>Loading..</>;
  return (
    <>
      {users.map((user) => (
        <MapMarker
          key={`${user.nickname}-${user.location}`}
          position={user.location}
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
