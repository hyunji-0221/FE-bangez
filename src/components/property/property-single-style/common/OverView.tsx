import React from "react";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface OverViewProps {
  property: Property;
}

const OverView: React.FC<OverViewProps> = ({ property }) => {
  const confirmedDate: Date = new Date(property.atclCfmYmd);
  const formattedDate = confirmedDate.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });

  const convertToPyeong = (squareMeters: number): string => {
    const pyeong = squareMeters * 0.3025;
    return `${pyeong.toFixed(2)} 평`;
  };

  const overviewData = [
    {
      icon: "flaticon-home-1",
      label: " ",
      value: property.rletTpNm,
    },
    // {
    //   icon: "flaticon-garage",
    //   label: "계약면적",
    //   value: `${property.spc1} ㎡`,
    //   xs: true,
    // },
    // {
    //   icon: "flaticon-garage",
    //   label: "전용면적",
    //   value: `${property.spc2} ㎡`,
    //   xs: true,
    // },
    {
      icon: "flaticon-expand",
      label: "평수",
      value: convertToPyeong(property.spc1),
      xs: true,
    },
    {
      icon: "flaticon-event",
      label: "등록 날짜",
      value: formattedDate,
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