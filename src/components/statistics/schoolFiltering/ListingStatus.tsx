'use client'

import React from "react";

const ListingStatus = ({ filterFunctions }: any) => {
  const options = [
    { id: "flexRadioDefault0", label: "전부", defaultChecked: true },
    { id: "flexRadioDefault1", label: "종로구" },
    { id: "flexRadioDefault2", label: "중구" },
    { id: "flexRadioDefault3", label: "용산구" },
    { id: "flexRadioDefault4", label: "성동구" },
    { id: "flexRadioDefault5", label: "광진구" },
    { id: "flexRadioDefault6", label: "동대문구" },
    { id: "flexRadioDefault7", label: "중랑구" },
    { id: "flexRadioDefault8", label: "성북구" },
    { id: "flexRadioDefault9", label: "강북구" },
    { id: "flexRadioDefault10", label: "도봉구" },
    { id: "flexRadioDefault11", label: "노원구" },
    { id: "flexRadioDefault12", label: "은평구" },
    { id: "flexRadioDefault13", label: "서대문구" },
    { id: "flexRadioDefault14", label: "마포구" },
    { id: "flexRadioDefault15", label: "양천구" },
    { id: "flexRadioDefault16", label: "강서구" },
    { id: "flexRadioDefault17", label: "구로구" },
    { id: "flexRadioDefault18", label: "금천구" },
    { id: "flexRadioDefault19", label: "영등포구" },
    { id: "flexRadioDefault20", label: "동작구" },
    { id: "flexRadioDefault21", label: "관악구" },
    { id: "flexRadioDefault22", label: "서초구" },
    { id: "flexRadioDefault23", label: "강남구" },
    { id: "flexRadioDefault24", label: "송파구" },
    { id: "flexRadioDefault25", label: "강동구" },
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
            id={option.id}
            checked={filterFunctions?.listingStatus === option.label}
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
