import { createUser, getRoomData } from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SignInForm from '@/components/units/room/SignInForm';
import { useState } from 'react';

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['room'], queryFn: () => getRoomData(id) });
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('userInfo')));

  const isLoggedIn = !!currentUser;

  const queryClient = useQueryClient();

  const { mutate: mutateNewUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['room']);
    }
  });

  const checkExistUser = (nickname) => {
    const selectedUser = data.users.findIndex((user) => user.nickname === nickname);
    return selectedUser === -1 ? false : true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;
    const password = e.target.password.value;

    if (checkExistUser(nickname)) {
      const user = data.users.find((user) => user.nickname === nickname);

      if (user.pwd !== password) {
        alert('비밀번호가 틀립니다.');
        return;
      }

      sessionStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      const newUser = { id: crypto.randomUUID(), nickname, pwd: password, roomId: id };
      mutateNewUser(newUser);

      sessionStorage.setItem('userInfo', JSON.stringify(newUser));
    }
    setCurrentUser(JSON.parse(sessionStorage.getItem('userInfo')));
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
        {/* {data.users.map((user) => (
          <div key={user.id}>{user.nickname}</div>
        ))} */}
      </section>
      <section>
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
