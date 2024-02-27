import styles from './UserList.module.css';

function UserList({ users }) {
  return (
    <ul className={styles.users}>
      {users.map((user) => {
        return <li key={user.id}>{user.nickname}</li>;
      })}
    </ul>
  );
}

export default UserList;
