import { useEffect } from 'react';

function KaKaoTalkShare({ room }) {
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
          webUrl: `${import.meta.env.VITE_APP_BASE_ROOM_URL}/${room.id}`
        }
      });
    }
  };

  return (
    <>
      <button id="kakaotalk-sharing-btn" onClick={kakaoButton}>
        카카오톡으로 공유하기
      </button>
    </>
  );
}

export default KaKaoTalkShare;
