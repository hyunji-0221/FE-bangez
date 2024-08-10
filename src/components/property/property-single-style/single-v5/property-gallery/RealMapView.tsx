
import React from "react";

interface RealMapViewProps {
  lat: number;
  lng: number;
}

const RealMapView: React.FC<RealMapViewProps> = ({ lat, lng }) => {
  const src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCsRpkx23xO-hyXaH4oolGJ4UhExnYjkIs&center=${lat},${lng}&zoom=18&maptype=roadmap`;

  console.log("Google Maps Embed URL:", src); // 콘솔에 URL을 출력하여 확인

  return (
    <iframe
      className="h600 w-100"
      src={src}
      allowFullScreen
    />
  );
};

export default RealMapView;


