import { MapMarker } from 'react-kakao-maps-sdk';
import pin from '@assets/icons/map-pin-2-fill.png';
import flag from '@assets/icons/flag-line.png';
import calcCenterPoint from '@/utils/calcCenterPoint';
import convexHull from '@/utils/convexHull';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomQuery } from '@/hooks/useRoomQuery';
import { useDispatch } from 'react-redux';
import { setCenterPoint } from '@/redux/modules/mapSlice';

const Halfway = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const {
    data: { users },
    isLoading
  } = useRoomQuery(id);

  const [usersData, setUsersData] = useState(users);

  const hasLocationUsers = usersData.filter((user) => user.location !== undefined);
  const sortedMarkers = convexHull(hasLocationUsers);
  const halfwayPoint = calcCenterPoint(sortedMarkers);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    dispatch(setCenterPoint(halfwayPoint));
  }, [halfwayPoint]);

  if (isLoading) return <>Loading..</>;
  return (
    <>
      {hasLocationUsers.map((user) => {
        return (
          <MapMarker
            key={`${user.nickname}-${user.location}`}
            position={{ lat: user.location.lat, lng: user.location.lng }}
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
        );
      })}
      {halfwayPoint && (
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
      )}
    </>
  );
};

export default Halfway;
