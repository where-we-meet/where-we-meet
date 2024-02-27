import { useEffect } from 'react';

function KaKaoTalkShare({ roomId }) {
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
        text: '기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.',
        link: {
          webUrl: `${import.meta.env.VITE_APP_BASE_ROOM_URL}/${roomId}`
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
