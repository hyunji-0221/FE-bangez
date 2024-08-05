// import React from "react";

// interface RealMapViewProps {
//   lat: number;
//   lng: number;
// }

// const RealMapView: React.FC<RealMapViewProps> = ({ lat, lng }) => {
//   const src = `https://www.google.com/maps/embed?pb=!4v1553797194458!6m8!1m7!1sR4K_5Z2wRHTk9el8KLTh9Q!2m2!1d${lat}!2d${lng}!3f305.15097!4f0!5f0.7820865974627469`;

//   return (
//     <iframe
//       className="h600 w-100"
//       src={src}
//       allowFullScreen
//     />
//   );
// };

// export default RealMapView;


import React from "react";

interface RealMapViewProps {
  lat: number;
  lng: number;
}

const RealMapView: React.FC<RealMapViewProps> = ({ lat, lng }) => {
  const src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCsRpkx23xO-hyXaH4oolGJ4UhExnYjkIs&center=${lat},${lng}&zoom=18&maptype=satellite`;

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


