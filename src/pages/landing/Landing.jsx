import { createRoom } from '@/apis/roomApi';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';

function Landing() {
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const { id } = await createRoom(e.target.roomName.value);
    navigate(`/room/${id}`);
    e.target.reset();
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Where We Meet?</h1>
      <form className={styles.form} onSubmit={handleCreateRoom}>
        <input type="text" name="roomName" placeholder="모임 이름"></input>
        <button type="button" title="모임 생성">
          <FiPlusCircle />
        </button>
      </form>
    </section>
  );
}

export default Landing;
