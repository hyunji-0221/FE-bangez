// Map.tsx
import { useEffect, useRef } from 'react';
import CustomOverlayContent from './CustomOverlayContent'; // 커스텀 오버레이 컴포넌트
import { Property } from '@/module/property/Property';
import ReactDOM from 'react-dom/client';
declare global {
  interface Window {
    kakao: any;
  }
}
interface MapProps {
  properties: Property[];
}
const Map: React.FC<MapProps> = ({ properties }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isMapInitialized = useRef(false);
  const mapInstance = useRef<any>(null);
  const clustererInstance = useRef<any>(null);
  const overlayInstance = useRef<any[]>([]); // 활성 오버레이 목록 추적
  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && !isMapInitialized.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.4966645, 126.9929804),
          level: 8,
        };
        mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);
        clustererInstance.current = new window.kakao.maps.MarkerClusterer({
          map: mapInstance.current,
          averageCenter: true,
          minLevel: 7,
          disableClickZoom: true,
        });
        isMapInitialized.current = true;
        window.kakao.maps.event.addListener(mapInstance.current, 'zoom_changed', () => {
          const level = mapInstance.current.getLevel();
          if (level < 10) {
            console.log('Detailed view triggered at zoom level', level);
          }
        });
      }
    };
    if (!window.kakao) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=clusterer&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initializeMap);
      };
      script.onerror = () => {
        console.error('Failed to load the Kakao map script.');
      };
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(initializeMap);
    }
  }, []);
  useEffect(() => {
    if (mapInstance.current && clustererInstance.current) {
      const map = mapInstance.current;
      const clusterer = clustererInstance.current;
      // 기존 오버레이 제거
      overlayInstance.current.forEach((overlay) => overlay.setMap(null));
      overlayInstance.current = [];
      const markers = properties.map((property, index) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(property.lat), parseFloat(property.lng));
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map, // 마커를 지도에 바로 추가
        });
        // 오버레이 생성 및 지도에 추가
        const overlayContent = document.createElement('div');
        const root = ReactDOM.createRoot(overlayContent);
        root.render(
          <CustomOverlayContent
            property={property}
            onClose={() => {
              overlay.setMap(null); // 오버레이 닫기
              overlayInstance.current = overlayInstance.current.filter((_, i) => i !== index);
            }}
          />
        );
        const overlay = new window.kakao.maps.CustomOverlay({
          content: overlayContent,
          map: map,
          position: marker.getPosition(),
          yAnchor: 1.3, // 오버레이를 마커 위로 위치 조정
        });
        overlayInstance.current.push(overlay);
        window.kakao.maps.event.addListener(marker, 'click', () => {
          // 다른 오버레이를 닫고 클릭한 마커의 오버레이만 남김
          overlayInstance.current.forEach((o, i) => {
            if (i !== index) o.setMap(null);
          });
          overlay.setMap(map); // 현재 오버레이 활성화
        });
        return marker;
      });
      clusterer.clear();
      clusterer.addMarkers(markers);
    }
  }, [properties]); // properties가 변경될 때마다 실행
  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
  );
};
export default Map;