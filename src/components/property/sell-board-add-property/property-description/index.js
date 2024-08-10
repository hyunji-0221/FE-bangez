'use client'

import React from "react";
import Select from "react-select";

const PropertyDescription = ({ data, onChange }) => {
  const catergoryOptions = [
    { value: "아파트", label: "아파트" },
    { value: "오피스텔", label: "오피스텔" },
  ];

  const listedIn = [
    { value: "매매", label: "매매" },
    { value: "전세", label: "전세" },
    { value: "월세", label: "월세" },
  ];

  const PropertyStatus = [
    { value: "강남구", label: "강남구" },
    { value: "서초구", label: "서초구" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <div className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">제목</label>
            <input
              type="text"
              className="form-control"
              placeholder="제목 입력"
              value={data.postTitle}
              onChange={(e) => onChange({ postTitle: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              내용
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="내용을 작성해 주세요."
              value={data.postContent}
              onChange={(e) => onChange({ postContent: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              건물 유형
            </label>
            <Select
              defaultValue={catergoryOptions.find(option => option.value === data.buildType)}
              onChange={(selected) => onChange({ buildType: selected.value })}
              options={catergoryOptions}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              거래 유형
            </label>
            <Select
              defaultValue={listedIn.find(option => option.value === data.tradeType)}
              onChange={(selected) => onChange({ tradeType: selected.value })}
              options={listedIn}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              지역
            </label>
            <Select
              placeholder="지역 선택"
              defaultValue={PropertyStatus.find(option => option.value === data.location)}
              onChange={(selected) => onChange({ location: selected.value })}
              options={PropertyStatus}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              보증금 / 전세금 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
              value={data.rentPrice}
              onChange={(e) => onChange({ rentPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              월세 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
              value={data.monthPrice}
              onChange={(e) => onChange({ monthPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              매매 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
              value={data.tradePrice}
              onChange={(e) => onChange({ tradePrice: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;