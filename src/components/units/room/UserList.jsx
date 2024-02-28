import { useDispatch } from 'react-redux';
import styles from './UserList.module.css';
import { setViewPoint } from '@/redux/modules/mapSlice';

function UserList({ users }) {
  const dispatch = useDispatch();

  const handleViewPoint = (location) => {
    if (!location) return;

    dispatch(setViewPoint({ lat: location.lat, lng: location.lng }));
  };

  return (
    <ul className={styles.users}>
      {users.map((user) => {
        return (
          <li onClick={() => handleViewPoint(user.location)} key={user.id}>
            {user.nickname}
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
