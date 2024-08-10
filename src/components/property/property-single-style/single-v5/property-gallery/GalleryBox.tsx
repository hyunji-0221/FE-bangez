
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface GalleryBoxProps {
  property: Property;
}

const GalleryBox: React.FC<GalleryBoxProps> = ({ property }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // 폴더에 있는 이미지 파일명 목록 생성
    const imageFiles = [
      '/images/listings/make1/1.jpg',
      '/images/listings/make1/2.jpg',
      '/images/listings/make1/3.jpg',
      '/images/listings/make1/4.jpg',
      '/images/listings/make1/5.jpg',
      '/images/listings/make1/6.jpg',
      '/images/listings/make1/7.jpg',
      '/images/listings/make1/8.jpg',
      '/images/listings/make1/9.jpg',
      '/images/listings/make1/10.jpg',
    ];

    // 랜덤하게 이미지 선택
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    // property.image가 있는 경우 해당 이미지와 랜덤 이미지를 함께 사용
    const initialImages = property.image ? [property.image, randomImage] : [randomImage];
    
    setImageUrls(initialImages);
  }, [property.image]);

  return (
    <>
      <Swiper
        spaceBetween={0}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".single-pro-slide-next__active",
          prevEl: ".single-pro-slide-prev__active",
        }}
        slidesPerView={1}
        loop={true}
        speed={1000}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <Image
                width={1519}
                height={475}
                className="w-100 h-100 cover"
                src={imageUrl}
                alt={`Image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="single-pro-slide-prev__active swiper_button _prev">
          <i className="far fa-arrow-left-long" />
        </button>
        {/* End prev */}

        <button className="single-pro-slide-next__active swiper_button _next">
          <i className="far fa-arrow-right-long" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default GalleryBox;