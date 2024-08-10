import listings from "@/data/listings";
import React from "react";


const OverView = ({id}) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "침실",
      value: "3개",
    },
    {
      icon: "flaticon-shower",
      label: "화장실",
      value: "2개",
    },
    {
      icon: "flaticon-event",
      label: "사용 승인일",
      value: "5년 이내",
    },
    {
      icon: "flaticon-garage",
      label: "지역",
      value: "강남구",
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "평수",
      value: "30평",
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "건물 종류",
      value: "아파트",
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
