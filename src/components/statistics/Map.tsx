"use client";

import { useEffect, useRef, useState } from 'react';
import { CityPark } from '@/module/cityPark/CityPark';
import { getCityParks } from '../statistics-api/StatisticsAPI';

declare global {
  interface Window {
    kakao: any;
  }
}

interface CityMapProps {
  selectedDistrict: string | null;
  centerCoords: { lat: number, lng: number } | null;
}

export const CityMap: React.FC<CityMapProps> = ({ selectedDistrict, centerCoords }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isMapInitialized = useRef(false);
  const mapInstance = useRef<any>(null);
  const clustererInstance = useRef<any>(null);
  const [cityPark, setCityPark] = useState<CityPark[]>([]);
  const infoWindowRef = useRef<any>(null); // 현재 열려 있는 InfoWindow

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && !isMapInitialized.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.494625, 127.027660),
          level: 4,
        };
        mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);
        clustererInstance.current = new window.kakao.maps.MarkerClusterer({
          map: mapInstance.current,
          averageCenter: true,
          minLevel: 5,
          disableClickZoom: true,
        });
        isMapInitialized.current = true;
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
    const fetchData = async () => {
      try {
        const result = await getCityParks();
        setCityPark(result);
      } catch (error) {
        console.error("Failed to fetch city parks:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapInstance.current && clustererInstance.current && cityPark.length > 0) {
      const clusterer = clustererInstance.current;

      // 선택된 구에 따라 공원을 필터링
      const filteredParks = selectedDistrict
        ? cityPark.filter(park => park.address.split(' ')[1] === selectedDistrict)
        : cityPark;

      const markers = filteredParks.map((park) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(park.latitude), parseFloat(park.longitude));
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // InfoWindow 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding:10px; font-size:14px; max-width: 250px; word-wrap: break-word;">
              <strong>${park.parkName}</strong><br />
              주소: ${park.address}<br />
              면적: ${park.area}㎡<br />
              유형: ${park.parkType}
            </div>
          `,
        });

        // 마커를 클릭했을 때 InfoWindow 표시
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.close(); // 이전 InfoWindow 닫기
          }
          infoWindow.open(mapInstance.current, marker);
          infoWindowRef.current = infoWindow; // 현재 열린 InfoWindow 참조 저장
        });

        return marker;
      });

      clusterer.clear();
      clusterer.addMarkers(markers);

      // 맵을 클릭했을 때 모든 InfoWindow 닫기
      window.kakao.maps.event.addListener(mapInstance.current, 'click', () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
      });
    }
  }, [cityPark, selectedDistrict]); // selectedDistrict가 변경될 때마다 마커 업데이트

  // 구청의 좌표로 지도 중심 이동
  useEffect(() => {
    if (mapInstance.current && centerCoords) {
      const moveLatLon = new window.kakao.maps.LatLng(centerCoords.lat, centerCoords.lng);
      mapInstance.current.setCenter(moveLatLon);
    }
  }, [centerCoords]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
  );
};

export default CityMap;
