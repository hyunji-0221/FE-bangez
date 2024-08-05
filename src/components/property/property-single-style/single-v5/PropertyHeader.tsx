import React from "react";
import { Property } from "@/module/property/Property";



interface PropertyHeaderProps {
  property: Property;
}

// 가격을 쉼표로 포맷하는 함수
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// 가격을 억 단위와 만 단위로 포맷하는 함수
const formatPriceWithUnits = (price: number): string => {
  if (price >= 10000) {
    const eok = Math.floor(price / 10000);
    const man = price % 10000;
    return man > 0 ? `₩${formatPrice(eok)}억 ${formatPrice(man)}` : `₩${formatPrice(eok)}억`;
  } else {
    return `₩${formatPrice(price)}만`;
  }
};


const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {

  const currentDate: Date = new Date();
  const confirmedDate: Date = new Date(property.atclCfmYmd);
  const differenceInMilliseconds: number = currentDate.getTime() - confirmedDate.getTime();
  const differenceInDays: number = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  

  const formattedPrice = formatPriceWithUnits(property.prc);


  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{property.atclNm}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {property.town}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm"
              href="#"
            >
              {property.rletTpNm}
            </a>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm"
              href="#"
            >
              {/* <i className="fas fa-circle fz10 pe-2" /> */}

              {property.tradTpNm}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"

            >
              <i className="far fa-clock pe-2" />{differenceInDays} days ago
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              8721
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0"> {formattedPrice}</h3>
            <p className="text space fz15"> ₩{(property.prc / (property.spc1 * 0.3025)).toFixed(0)}(만)/평</p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;