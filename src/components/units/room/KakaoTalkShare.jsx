import { useEffect } from 'react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styles from './KakaoTalkShare.module.css';

function KakaoTalkShare({ room }) {
  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    kakaoScript.async = true;
    document.head.appendChild(kakaoScript);
  }, []);

  const kakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_APP_KAKAOMAP_API_KEY);
      }

      kakao.Share.sendDefault({
        objectType: 'text',
        text: `${room.roomName} 모임 링크 바로가기`,
        link: {
          mobileWebUrl: `${import.meta.env.VITE_APP_BASE_ROOM_URL}/${room.id}`,
          webUrl: `${import.meta.env.VITE_APP_BASE_ROOM_URL}/${room.id}`
        }
      });
    }
  };

  return (
    <>
      <button className={styles.btn} title="공유하기" onClick={kakaoButton}>
        공유하기
        <RiKakaoTalkFill />
      </button>
    </>
  );
}

export default KakaoTalkShare;
