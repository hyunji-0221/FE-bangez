"use client";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// NearbySimilarProperty 컴포넌트
const NearbySimilarProperty = ({ similarProperties }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {similarProperties.map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src="/images/HomeImageExample.jpg"
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap">
                    {listing.forRent && (
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                  {listing.rentPrice > 0 &&
                listing.monthPrice === 0 &&
                listing.tradePrice === 0 ? (
                  <>
                    {listing.rentPrice} / <span>전세</span>
                  </>
                ) : listing.monthPrice > 0 &&
                  listing.tradePrice === 0 &&
                  listing.rentPrice === 0 ? (
                  <>
                    {listing.monthPrice} / <span>월</span>
                  </>
                ) : listing.tradePrice > 0 &&
                  listing.monthPrice === 0 &&
                  listing.rentPrice === 0 ? (
                  <>{listing.tradePrice} / <span>매매</span></>
                ) : (
                  <>
                    {listing.monthPrice} / <span>월</span>
                    {/* 기본값으로 설정 */}
                  </>
                )}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/sell-board-detail/${listing.id}`}>
                  {listing.postTitle}
                </Link>
              </h6>
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> 방 {listing.roomCount}개
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> 화장실 {listing.toiletCount} 개
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.size} 평
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">For Rent</span>
                    <div className="icons d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-fullscreen" />
                      </a>
                      <a href="#">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a href="#">
                        <span className="flaticon-like" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;
