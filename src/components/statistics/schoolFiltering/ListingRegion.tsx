'use client'

import React from "react";

const listingRegion = ({ filterFunctions }: any) => {

    const typeOptions = [
      { id: "flexRadioDefault0", label: "전부", defaultChecked: true },
      { id: "flexRadioDefault1", label: "초등학교" },
      { id: "flexRadioDefault2", label: "중학교" },
      { id: "flexRadioDefault3", label: "고등학교" },
  
    ];
  
    return (
      <>

  {typeOptions.map((option) => (
          <div
            className="form-check d-flex align-items-center mb10"
            key={option.id}
          >
            <input
              className="form-check-input"
              type="radio"
              id={option.id}
              checked={filterFunctions?.listingRegion === option.label}
              onChange={() => filterFunctions.handlelistingRegion(option.label)}
            />
            <label className="form-check-label" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  
  export default listingRegion;
  