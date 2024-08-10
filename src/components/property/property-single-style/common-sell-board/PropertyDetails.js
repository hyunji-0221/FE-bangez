import React from "react";

const PropertyDetails = () => {
  const columns = [
    [
      {
        label: "게시물 번호",
        value: "1",
      },
      {
        label: "거래유형",
        value: "매매",
      },
      {
        label: "가격",
        value: "매매가 50000 만원",
      },
      {
        label: "층수",
        value: "고층",
      },
    ],
    [
      {
        label: "입주희망일",
        value: "즉시",
      },
      {
        label: "사용승인일",
        value: "5년 이내",
      },
      {
        label: "세대수",
        value: "100세대 미만",
      },
      
      {
        label: "주차대수",
        value: "세대당 1대 이상",
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
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
