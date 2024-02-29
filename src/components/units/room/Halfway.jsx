import { MapMarker } from 'react-kakao-maps-sdk';
import calcCenterPoint from '@/utils/calcCenterPoint';
import convexHull from '@/utils/convexHull';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomQuery } from '@/hooks/useRoomQuery';
import { useDispatch } from 'react-redux';
import { setCenterPoint } from '@/redux/modules/mapSlice';
import flag from '@assets/icons/flag.svg';
import { pins } from '@/utils/selectUserPins';

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
    if (hasLocationUsers.length >= 2) {
      dispatch(setCenterPoint(halfwayPoint));
    }
  }, [users, halfwayPoint]);

  if (isLoading) return <>Loading..</>;

  return (
    <>
      {usersData.map((user, i) => {
        if (user.location !== undefined)
          return (
            <MapMarker
              key={`${user.nickname}-${user.location}`}
              position={{ lat: user.location.lat, lng: user.location.lng }}
              image={{
                src: pins[i % 7],
                size: {
                  width: 50,
                  height: 50
                },
                options: {
                  offset: {
                    x: 24,
                    y: 45
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
              width: 40,
              height: 40
            },
            options: {
              offset: {
                x: 8,
                y: 35
              }
            }
          }}
        />
      )}
    </>
  );
};

export default Halfway;
