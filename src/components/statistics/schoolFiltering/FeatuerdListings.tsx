"use client";

import Image from "next/image";
import Link from "next/link";

interface Listing {
  address: string;
  homepage: string;
  schoolName: string;
  schoolType: string;
}

interface FeaturedListingsProps {
  data: Listing[];
  colstyle: boolean;
  schools: Listing[];
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({ data, colstyle, schools }) => {



  return (
    <>
      {data.map((listing, index) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={index} // Using index as key since there is no unique id
        >
          <div
            className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }
          >
            <div className="list-thumb">
            <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${listing.address}&t=m&z=14&output=embed&iwloc=near`}
          title={listing.schoolName}
          aria-label={listing.address}
        />

              {/* Since price is removed from the listing data, you might want to adjust or remove this */}
              <div className="list-price">
                {/* {listing.price} / <span>mo</span> */}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
              <span>{listing.schoolName}</span>
              </h6>
              <div className="list-meta d-flex align-items-center">
                  <span className="flaticon-location" /> {listing.address}
              </div>
              <hr className="mt-2 mb-2" />
              <div >
              <a href={listing.homepage}  target="_blank" rel="noopener noreferrer" className="padding-right: 20px">
                    <span className="flaticon-home-3" />  홈페이지 바로가기
                  </a>

              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
