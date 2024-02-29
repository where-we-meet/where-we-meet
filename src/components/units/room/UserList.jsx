import { useDispatch } from 'react-redux';
import styles from './UserList.module.css';
import { setViewPoint } from '@/redux/modules/mapSlice';
import { FaUserCircle } from 'react-icons/fa';
import { userColors } from '@/utils/selectUserPins';

function UserList({ users }) {
  const dispatch = useDispatch();

  const handleViewPoint = (location) => {
    if (!location) return alert('해당 유저가 위치를 선택하지 않았습니다.');

    dispatch(setViewPoint({ lat: location.lat, lng: location.lng }));
  };

  return (
    <ul className={styles.users}>
      {users.map((user, i) => {
        return (
          <li onClick={() => handleViewPoint(user.location)} key={user.id}>
            <strong>{user.nickname}</strong>
            <p>{user.location?.name}</p>
            <FaUserCircle style={{ color: `${userColors[i]}` }} />
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
