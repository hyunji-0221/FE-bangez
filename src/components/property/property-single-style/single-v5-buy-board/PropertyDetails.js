import React from "react";

const PropertyDetails = ({ data }) => {
  // 가격을 결정하는 로직
  const getPrice = () => {
    const { rentPrice, monthPrice, tradePrice } = data;

    // tradePrice가 null이 아니고 나머지 두 가격이 null인 경우
    if (tradePrice !== null && rentPrice === null && monthPrice === null) {
      return "매매가 "+tradePrice;
    }
    // rentPrice가 null이 아니고 tradePrice와 monthPrice가 null인 경우
    else if (rentPrice !== null && tradePrice === null && monthPrice === null) {
      return "전세금 "+rentPrice;
    }
    // monthPrice가 null이 아니고 tradePrice가 null인 경우
    else if (monthPrice !== null && tradePrice === null) {
      return "월 "+ monthPrice;
    }
    // 모든 가격이 null인 경우
    return "정보 없음";
  };

  const columns = [
    [
      {
        label: "게시물 번호",
        value: data.id,
      },
      {
        label: "거래유형",
        value: data.tradeType,
      },
      {
        label: "가격",
        value: getPrice() + " 만원",  // 위에서 정의한 getPrice() 함수 호출
      },
      {
        label: "층수",
        value: data.floor,
      },
    ],
    [
      {
        label: "입주희망일",
        value: data.hopeMove,
      },
      {
        label: "사용승인일",
        value: data.acceptForUse,
      },
      {
        label: "세대수",
        value: data.numberOfApt,
      },
      
      {
        label: "주차대수",
        value: data.parking,
      },
    ],
  ];

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
