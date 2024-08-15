"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FloorPlansProps {
  imageUrl?: string; // 외부에서 이미지 URL을 받아올 수 있도록 설정
}

const FloorPlans: React.FC<FloorPlansProps> = ({ imageUrl }) => {
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    // make2 폴더에 있는 이미지 경로 배열
    const imageFiles = [
      '/Images/listings/make2/1.jpg',
      '/Images/listings/make2/2.jpg',
      '/Images/listings/make2/3.jpg',
      '/Images/listings/make2/4.jpg',
      '/Images/listings/make2/5.jpg',
      '/Images/listings/make2/6.jpg',
      '/Images/listings/make2/7.jpg',
      '/Images/listings/make2/8.jpg',
      '/Images/listings/make2/9.jpg',
      '/Images/listings/make2/10.jpg',
      '/Images/listings/make2/11.jpg',
      '/Images/listings/make2/12.jpg',
      '/Images/listings/make2/13.jpg',
    ];

    // 랜덤하게 이미지 선택
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImageUrl = imageFiles[randomIndex];

    setRandomImage(randomImageUrl);
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  // 기본 이미지 경로 설정
  const encodedImageUrl = encodeURI(imageUrl || randomImage || '/Images/about/ifnot.png');

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