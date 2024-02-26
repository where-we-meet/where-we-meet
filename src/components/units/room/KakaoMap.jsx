import useKakaoLoader from "@/hooks/useKakaoLoader";
import { Map } from "react-kakao-maps-sdk";

function KakaoMap() {
  const [loading, error] = useKakaoLoader();

  if (loading) return <div>Loading</div>;

  return (<>
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}></Map>

  </>
  );

}

export default KakaoMap;
