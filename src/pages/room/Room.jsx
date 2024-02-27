import * as roomApi from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SignInForm from '@/components/units/room/SignInForm';
import { useState } from 'react';
import persist from '@/utils/persist';
import MapWithSearch from '@/components/units/room/MapWithSearch';
import { useCustomMutation } from '@/hooks/useCustomMutation';

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['room'], queryFn: () => roomApi.getRoomData(id) });
  const [currentUser, setCurrentUser] = useState(persist.get('userInfo'));
  const [viewPoint, setViewPoint] = useState({ lat: 33.450701, lng: 126.570667 });

  const isLoggedIn = !!currentUser;

  const mutateNewUser = useCustomMutation(roomApi.createUser);

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
        <MapWithSearch setViewPoint={setViewPoint} />
      </section>
      <section className={styles.left}>
        {isLoggedIn ? (
          <div>
            <p>나</p>
            <p>{currentUser.nickname}</p>
          </div>
        ) : (
          <SignInForm handleSignIn={handleSignIn} />
        )}
      </section>
      <section className={styles.right}>
        <KakaoMap viewPoint={viewPoint} />
      </section>
    </div>
  );
}
export default Room;
