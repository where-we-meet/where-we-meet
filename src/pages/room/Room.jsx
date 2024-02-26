import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';

function Room() {
  return (
    <div className={styles.container}>
      <section></section>
      <section>
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
