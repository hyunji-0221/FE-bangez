'use client'

import React from "react";

const ListingStatus = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault3", label: "모두", defaultChecked: true },
    { id: "flexRadioDefault1", label: "아파트" },
    { id: "flexRadioDefault2", label: "오피스텔", },

  ];

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}

        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus == option.label}

            onChange={() => filterFunctions.handlelistingStatus(option.label)}




          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
