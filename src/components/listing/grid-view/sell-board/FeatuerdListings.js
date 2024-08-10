"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FeaturedListings = ({ data, colstyle }) => {
  const imageList = [
    "/images/example2.jpg",
    "/images/example3.jpg",
    "/images/example4.jpg",
    "/images/HomeImageExample.jpg",

    // 추가 이미지 경로
  ];

  // 이미지를 고르게 할 인덱스를 구함
  const getImageIndex = (listingId) => {
    return listingId % imageList.length;
  };

  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }
          >
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                style={{ height: "230px" }}
                src={imageList[getImageIndex(listing.id)]}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    추천
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
                  <span className="flaticon-shower" /> 화장실{" "}
                  {listing.toiletCount}개
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.size} 평
                </a>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">판매중</span>
                <div className="icons d-flex align-items-center">
                  {/* <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
