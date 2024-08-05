import React from "react";
import { Property } from "@/module/property/Property"; 

interface PropertyDetailsProps {
  property: Property;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatPriceWithUnits = (price: number): string => {
  if (price >= 10000) {
    const eok = Math.floor(price / 10000);
    const man = price % 10000;
    return man > 0 ? `${formatPrice(eok)}억 ${formatPrice(man)}만` : `${formatPrice(eok)}억`;
  } else {
    return `${formatPrice(price)}만`;
  }
};

const convertToPyeong = (squareMeters: number): string => {
  const pyeong = squareMeters * 0.3025;
  return `${pyeong.toFixed(2)} 평`;
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const formattedPrice = formatPriceWithUnits(property.prc);
  const formattedRentPrice = formatPriceWithUnits(property.rentPrc);

  const confirmedDate: Date = new Date(property.atclCfmYmd);
  const formattedDate = confirmedDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });

  const firstColumn = [
    {
      label: "거래 유형",
      value: property.tradTpNm,
    },
    {
      label: "평 수",
      value: convertToPyeong(property.spc1),
    },
    {
      label: "계약면적",
      value: `${property.spc1} ㎡`,
    },
    {
      label: "전용면적",
      value: `${property.spc2} ㎡`,
    },
  ];

  // Adjust visibility of price, deposit, and rent based on transaction type
  if (property.tradTpNm === "매매") {
    firstColumn.splice(1, 0, {
      label: "가격",
      value: formattedPrice,
    });
  } else if (property.tradTpNm === "전세") {
    firstColumn.splice(1, 0, {
      label: "보증금",
      value: formattedPrice, 
    });
  } else if (property.tradTpNm === "월세") {
    firstColumn.splice(1, 0, {
      label: "보증금",
      value: formattedPrice, 
    });
    firstColumn.splice(2, 0, {
      label: "월세",
      value: formattedRentPrice,
    });
  }

  const secondColumn = [
    {
      label: "층 수",
      value: `${property.flrInfo} 층`,
    },
    {
      label: "방향",
      value: property.direction,
    },
    {
      label: "등록 날짜",
      value: formattedDate,
    },
    {
      label: "Property Type",
      value: property.rletTpNm,
    },
    {
      label: "등록 번호",
      value: property.atclNo,
    },
  ];

  const columns = [firstColumn, secondColumn];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="col-md-6 col-xl-6">
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;