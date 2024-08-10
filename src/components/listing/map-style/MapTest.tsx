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

      const markers = properties.map((property) => {
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
            }} 
          />
        );

        const overlay = new window.kakao.maps.CustomOverlay({
          content: overlayContent,
          map: map,
          position: marker.getPosition(),
        });

        return marker;
      });

      clusterer.clear();
      clusterer.addMarkers(markers);
    }
  }, [properties]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
  );
};

export default Map;