import * as roomApi from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import KaKaoTalkShare from '@/components/units/room/KaKaoTalkShare';
import SignInForm from '@/components/units/room/SignInForm';
import { useState } from 'react';
import persist from '@/utils/persist';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { useRoomQuery } from '@/hooks/useRoomQuery';
import { useParams } from 'react-router-dom';

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
      <section>
        <h1>{data.roomName}</h1>
        {isLoggedIn ? (
          <div>
            <p>나</p>
            <p>{currentUser.nickname}</p>
          </div>
        ) : (
          <SignInForm handleSignIn={handleSignIn} />
        )}
      </section>
      <section>
        <KaKaoTalkShare room={data} />
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
