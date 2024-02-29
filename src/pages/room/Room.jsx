import * as roomApi from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import { Link, useParams } from 'react-router-dom';
import SignInForm from '@/components/units/room/SignInForm';
import { useState } from 'react';
import persist from '@/utils/persist';
import MapWithSearch from '@/components/units/room/MapWithSearch';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import UserList from '@/components/units/room/UserList';
import KakaoTalkShare from '@/components/units/room/KakaoTalkShare';
import { useRoomQuery } from '@/hooks/useRoomQuery';

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useRoomQuery(id);
  const mutateNewUser = useCustomMutation(roomApi.createUser);

  const [currentUser, setCurrentUser] = useState(persist.get('userInfo'));

  const isLoggedIn = !!currentUser;

  const getExistUser = (nickname) => {
    return data.users.find((user) => user.nickname === nickname);
  };

  const createUser = (nickname, password) => {
    const newUser = { id: crypto.randomUUID(), nickname, pwd: password, roomId: id };
    mutateNewUser(newUser);
    persist.set('userInfo', newUser);
    setCurrentUser(newUser);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;
    const password = e.target.password.value;

    const user = getExistUser(nickname);
    if (user === undefined) {
      createUser(nickname, password);
      return;
    }

    if (user.pwd !== password) {
      return alert('비밀번호가 틀립니다.');
    }

    persist.set('userInfo', user);
    setCurrentUser(user);
  };

  if (isLoading) return <>Loading..</>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{data.roomName}</h1>
        <Link to="/" className={styles.subtitle}>
          where we meet?
        </Link>
      </header>
      <section className={styles.search}>
        <MapWithSearch />
      </section>
      <section className={styles.left}>
        {isLoggedIn ? (
          <div className={styles.user_info}>
            <p>{currentUser.nickname}</p>
            <KakaoTalkShare room={data} />
          </div>
        ) : (
          <SignInForm handleSignIn={handleSignIn} />
        )}
        <UserList users={data.users} />
      </section>
      <section className={styles.right}>
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
