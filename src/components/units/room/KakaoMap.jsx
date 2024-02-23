import useKakaoLoader from "@/hooks/useKakaoLoader";
import { Map } from "react-kakao-maps-sdk";
import Halfway from "./Halfway";

const MARKERS = [
  { lat: 33.450705, lng: 126.570677 },
  { lat: 33.450936, lng: 126.569477 },
  { lat: 33.451979, lng: 126.56994 },
  { lat: 33.451393, lng: 126.570738 },
  { lat: 33.451493, lng: 126.571018 },
];

function KakaoMap() {
  const [loading, error] = useKakaoLoader();

  if (loading) return <div>Loading</div>;

  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: "100%", height: "360px" }}
    >
      <Halfway markers={MARKERS} />
    </Map>
  );
}

export default KakaoMap;
