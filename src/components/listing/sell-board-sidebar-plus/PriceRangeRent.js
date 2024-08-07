"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const PriceRangeRent = ({ filterFunctions }) => {
  const [price, setPrice] = useState([0, 10000]);

  // price range handler

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);

    filterFunctions?.handlepriceRange([value[0] || 0, value[1]]);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          formatLabel={() => ``}
          step={500}
          max={1000000}
          min={0}
          defaultValue={[
            filterFunctions?.priceRange[0],
            filterFunctions?.priceRange[1],
          ]}
          onChange={(value) => handleOnChange(value)}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">₩{price[0]}만</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">₩{price[1]}만</span>
        </div>
      </div>
    </>
  );
};

export default PriceRangeRent;
