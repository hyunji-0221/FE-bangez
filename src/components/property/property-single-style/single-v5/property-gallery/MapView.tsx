import React, { useEffect, useRef } from "react";

interface MapViewProps {
  lat: number;
  lng: number;
  label?: string;
}

const MapView: React.FC<MapViewProps> = ({
  lat,
  lng,
  label
}) => {
  const roadviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.getElementById("kakao-maps-sdk");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-maps-sdk";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=services`;
      script.async = true;
      script.onload = () => {
        initRoadview();
      };
      document.body.appendChild(script);
    } else {
      initRoadview();
    }

    function initRoadview() {
      if (roadviewRef.current && window.kakao) {
        const kakao = window.kakao;
        const rvContainer = roadviewRef.current;
        const roadview = new kakao.maps.Roadview(rvContainer);
        const roadviewClient = new kakao.maps.RoadviewClient();
        const rvPosition = new kakao.maps.LatLng(lat, lng);

        roadviewClient.getNearestPanoId(rvPosition, 50, function (panoId) {
          if (panoId) {
            roadview.setPanoId(panoId, rvPosition);

            // 로드뷰에 마커 추가
            const marker = new kakao.maps.Marker({
              position: rvPosition,
              map: roadview,
            });
            marker.setAltitude(10); // 마커의 높이를 설정합니다 (단위는 m입니다).
            marker.setRange(100); // 마커가 보일 수 있는 범위를 설정합니다 (단위는 m입니다).

            // 로드뷰에 인포윈도우 추가
            const infoWindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${label}</div>`,
            });
            infoWindow.setRange(100); // 인포윈도우가 보일 수 있는 범위를 설정합니다 (단위는 m입니다).
            infoWindow.open(roadview, marker);

            // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 조정
            const projection = roadview.getProjection();
            const viewpoint = projection.viewpointFromCoords(
              marker.getPosition(),
              marker.getAltitude()
            );
            roadview.setViewpoint(viewpoint);
          } else {
            console.warn("No nearby roadview found.");
          }
        });
      }
    }
  }, [lat, lng, label]);

  return <div ref={roadviewRef} style={{ width: "100%", height: "600px" }} />;
};

export default MapView;

