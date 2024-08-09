'use client'

import React from "react";
import Select from "react-select";

const DetailsFiled = ({ data, onChange, onSubmit }) => {
  const NumberOfApt = [
    { value: "100세대 미만", label: "100세대 미만" },
    { value: "100세대 이상", label: "100세대 이상" },
    { value: "500세대 이상", label: "500세대 이상" },
    { value: "1000세대 이상", label: "1000세대 이상" },
  ];

  const AcceptForUse = [
    { value: "5년 이내", label: "5년 이내" },
    { value: "10년 이내", label: "10년 이내" },
    { value: "15년 이내", label: "15년 이내" },
    { value: "15년 이상", label: "15년 이상" },
  ];

  const Parking = [
    { value: "세대당 1대 이상", label: "세대당 1대 이상" },
    { value: "세대당 2대 이상", label: "세대당 2대 이상" },
  ];

  const Convenient = [
    { value: "편의점", label: "편의점" },
    { value: "마트", label: "마트" },
    { value: "은행", label: "은행" },
    { value: "병원", label: "병원" },
    { value: "약국", label: "약국" },
    { value: "지하철", label: "지하철" },
    { value: "유치원", label: "유치원" },
    { value: "어린이집", label: "어린이집" },
    { value: "초등학교", label: "초등학교" },
    { value: "중학교", label: "중학교" },
    { value: "고등학교", label: "고등학교" },
  ];

  const Floor = [
    { value: "저층", label: "저층" },
    { value: "고층", label: "고층" },
  ];

  const HopeMove = [
    { value: "즉시 입주 가능", label: "즉시 입주 가능" },
    { value: "협의", label: "협의" },
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
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              최소 면적 (단위 : 평)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="숫자만 입력"
              value={data.size}
              onChange={(e) => onChange({ size: e.target.value })}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">방 개수</label>
            <input
              type="text"
              className="form-control"
              placeholder="숫자만 입력"
              value={data.roomCount}
              onChange={(e) => onChange({ roomCount: e.target.value })}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              화장실 / 욕실
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="숫자만 입력"
              value={data.toiletCount}
              onChange={(e) => onChange({ toiletCount: e.target.value })}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              세대수
            </label>
            <Select
              defaultValue={NumberOfApt.find(option => option.value === data.numberOfApt)}
              onChange={(selected) => onChange({ numberOfApt: selected.value })}
              options={NumberOfApt}
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
              사용승인일
            </label>
            <Select
              defaultValue={AcceptForUse.find(option => option.value === data.acceptForUse)}
              onChange={(selected) => onChange({ acceptForUse: selected.value })}
              options={AcceptForUse}
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
              주차대수
            </label>
            <Select
              defaultValue={Parking.find(option => option.value === data.parking)}
              onChange={(selected) => onChange({ parking: selected.value })}
              options={Parking}
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
              편의 시설
            </label>
            <Select
              defaultValue={data.convenient}
              onChange={(selected) => onChange({ convenient: selected.map(option => option.value) })}
              options={Convenient}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              isMulti
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              층수
            </label>
            <Select
              defaultValue={Floor.find(option => option.value === data.floor)}
              onChange={(selected) => onChange({ floor: selected.value })}
              options={Floor}
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
              입주 가능일
            </label>
            <Select
              defaultValue={HopeMove.find(option => option.value === data.hopeMove)}
              onChange={(selected) => onChange({ hopeMove: selected.value })}
              options={HopeMove}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              추가 내용
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder=" "
              value={data.moreContent}
              onChange={(e) => onChange({ moreContent: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-xxl-end">
        <button type="button" className="ud-btn btn-thm" onClick={onSubmit}>
          작성 완료
          <i className="fal fa-arrow-right-long"/>
        </button>
      </div>
    </div>
  );
};

export default DetailsFiled;