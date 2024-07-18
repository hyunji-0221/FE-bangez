"use client";
import { apartmentType } from "@/data/apartmentType";
import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Autoplay } from "swiper";
// import "swiper/swiper-bundle.min.css";
import Link from "next/link";
// SwiperCore.use([Autoplay]);

const ApartmentType = () => {
  return (
    apartmentType.map((type) => (
      <div key={type.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="item h-100">
          <Link href="/grid-full-3-col">
            <div className="iconbox-style4">
              <span className={`icon ${type.icon}`} />
              <div className="iconbox-content">
                <h6 className="title">{type.title}</h6>
                <p className="text mb-0">{`${type.content}`}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ))
  );
};

export default ApartmentType;
