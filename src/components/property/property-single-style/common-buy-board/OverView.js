import React from "react";

const OverView = ({ data }) => {
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "침실",
      value: `${data.roomCount}개`,
    },
    {
      icon: "flaticon-shower",
      label: "화장실",
      value: `${data.toiletCount}개`,
    },
    {
      icon: "flaticon-event",
      label: "사용 승인일",
      value: data.acceptForUse,
    },
    {
      icon: "flaticon-garage",
      label: "지역",
      value: data.location || "정보 없음",  // 데이터가 없는 경우 기본값으로 설정
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "평수",
      value: `${data.size}평`,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "건물 종류",
      value: data.buildType,
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
