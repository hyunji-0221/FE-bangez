import React from "react";
import Image from "next/image";

interface FloorPlansProps {
  imageUrl?: string; // 이미지 URL을 받아올 수 있도록 설정
}

const FloorPlans: React.FC<FloorPlansProps> = ({ imageUrl }) => {
  // 기본 이미지 경로 설정
  const encodedImageUrl = imageUrl ? encodeURI(imageUrl) : '/Images/about/ifnot.png';

  console.log('Encoded Image URL:', encodedImageUrl); // 인코딩된 URL 로그 출력

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-body text-center">
        <Image
          src={encodedImageUrl} // 인코딩된 URL 사용
          width={736}
          height={544}
          className="w-100 h-100 cover"
          alt="listing figure"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default FloorPlans;