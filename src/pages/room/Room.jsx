import * as roomApi from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SignInForm from '@/components/units/room/SignInForm';
import { useState } from 'react';

const persist = {
  get: (key) => {
    JSON.parse(sessionStorage.getItem(key));
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['room'], queryFn: () => roomApi.getRoomData(id) });
  const [currentUser, setCurrentUser] = useState(persist.get('userInfo'));

  const isLoggedIn = !!currentUser;

  const queryClient = useQueryClient();

  const { mutate: mutateNewUser } = useMutation({
    mutationFn: roomApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['room']);
    }
  });

  const getExistUser = (nickname) => {
    return data.users.find((user) => user.nickname === nickname);
  };

  const createUser = (nickname, password) => {
    const newUser = { id: crypto.randomUUID(), nickname, pwd: password, roomId: id };
    mutateNewUser(newUser);
    persist.set('userInfo', newUser);
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
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
