import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "@/hooks/useKakaoLoader"
import { useRef, useState } from "react"

export default function MapRelayout() {
  useKakaoLoader()
  const mapRef = useRef(null)

  const [onClickToggleButton, setOnClickToggleButton] = useState(false);

  const mapSize = onClickToggleButton ? { width: '650px', height: '650px' } : { width: '100%', height: '350px' }

  const resizeMap = () => {
    setOnClickToggleButton(!onClickToggleButton)
    setTimeout(() => {
      mapRef.current?.relayout()
    }, 0)
  }

  return (
    <>
      <Map
        id="map"
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={mapSize}
        level={3}
        ref={mapRef}
      />
      <p>
        <button onClick={resizeMap}>지도 크기 바꾸기 및 relayout 호출하기</button>
      </p>
    </>
  )
}