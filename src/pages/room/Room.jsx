import { getRoomData } from '@/apis/roomApi';
import styles from './Room.module.css';
import KakaoMap from '@/components/units/room/KakaoMap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['room'], queryFn: () => getRoomData(id) });

  if (isLoading) return <>Loading..</>;

  return (
    <div className={styles.container}>
      <section>{data.roomName}</section>
      <section>
        <KakaoMap />
      </section>
    </div>
  );
}
export default Room;
