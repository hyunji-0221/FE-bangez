"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const PriceRange = ({ filterFunctions }) => {
  const [prc, setPrice] = useState([20, 70987]);

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);

    filterFunctions?.handlepriceRange([value[0] || 0, value[1]]);
  };

  // 숫자를 천 단위로 쉼표를 추가하여 형식화
  const formatNumber = (number) => {
    return new Intl.NumberFormat('ko-KR').format(number);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          formatLabel={() => ``}
          max={999999}
          min={0}
          defaultValue={[
            filterFunctions?.priceRange[0],
            filterFunctions?.priceRange[1],
          ]}
          onChange={(value) => handleOnChange(value)}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">₩{formatNumber(prc[0])}(만원)</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">₩{formatNumber(prc[1])}(만원)</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
