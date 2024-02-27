import { createRoom } from '@/apis/roomApi';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';

function Landing() {
  const navigate = useNavigate();
  const [easterEgg, setEasterEgg] = useState(0);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const { id } = await createRoom(e.target.roomName.value);
    navigate(`/room/${id}`);
    e.target.reset();
  };

  const clickEasterEgg = () => {
    if (easterEgg === 5) setEasterEgg(0);
    setEasterEgg((prev) => prev + 1);
  };

  return (
    <section className={styles.section}>
      <h1 className={`${styles.title} ${easterEgg === 5 ? styles.easter_egg : ''}`}>
        Where We Meet<button onClick={clickEasterEgg}>?</button>
      </h1>
      <form className={`${styles.form} ${easterEgg === 5 ? styles.easter_egg : ''}`} onSubmit={handleCreateRoom}>
        <input type="text" name="roomName" placeholder="모임 이름"></input>
        <button type="button" title="모임 생성">
          <FiPlusCircle />
        </button>
      </form>
    </section>
  );
}

export default Landing;
