'use client'

import React from "react";

const OtherFeatures = ({filterFunctions}) => {
  const featuresLeftColumn = [
    { label: "베란다" , defaultChecked: true},
    { label: "세탁기"  },
    { label: "건조기" },
  ];

  const featuresRightColumn = [
    { label: "주차장",},
    { label: "냉장고" },
    { label: "에어컨" },
  ];



  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="checkbox-style1">
          {featuresLeftColumn.map((feature, index) => (
            <label className="custom_checkbox" key={index}>
              {feature.label}
              <input checked={filterFunctions?.categories.includes(feature.label)}
            type="checkbox" onChange={()=>filterFunctions?.handlecategories(feature.label)}  />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      {/* End .col-6 */}

      <div className="col-lg-6">
        <div className="checkbox-style1">
          {featuresRightColumn.map((feature, index) => (
            <label className="custom_checkbox" key={index}>
              {feature.label}
              
              <input type="checkbox" onChange={()=>filterFunctions?.handlecategories(feature.label)}  defaultChecked={feature.defaultChecked} />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      {/* End .col-6 */}
    </div>
  );
};

export default OtherFeatures;
