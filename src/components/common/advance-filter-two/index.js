"use client";
import React, { useState } from "react";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";

const AdvanceFilterModal = ({ filterFunctions }) => {
  const catOptions = [
    { value: "오피스텔", label: "오피스텔" },
    { value: "아파트", label: "아파트" },
  ];
  const tradTpNmOptions = [
    { value: "매매", label: "매매" },
    { value: "전세", label: "전세" },
    { value: "월세", label: "월세" },
  ];

  const locationOptions = [
    { value: "전체", label: "전체" },
    { value: "강남구", label: "강남구" },
    { value: "강동구", label: "강동구" },
    { value: "강북구", label: "강북구" },
    { value: "강서구", label: "강서구" },
    { value: "관악구", label: "관악구" },
    { value: "광진구", label: "광진구" },
    { value: "구로구", label: "구로구" },
    { value: "금천구", label: "금천구" },
    { value: "노원구", label: "노원구" },
    { value: "도봉구", label: "도봉구" },
    { value: "동대문구", label: "동대문구" },
    { value: "동작구", label: "동작구" },
    { value: "마포구", label: "마포구" },
    { value: "서대문구", label: "서대문구" },
    { value: "서초구", label: "서초구" },
    { value: "성동구", label: "성동구" },
    { value: "성북구", label: "성북구" },
    { value: "송파구", label: "송파구" },
    { value: "양천구", label: "양천구" },
    { value: "영등포구", label: "영등포구" },
    { value: "용산구", label: "용산구" },
    { value: "은평구", label: "은평구" },
    { value: "종로구", label: "종로구" },
    { value: "중구", label: "중구" },
    { value: "중랑구", label: "중랑구" },
    
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

  // 평 수 상태 관리
  const [minSquareFeet, setMinSquareFeet] = useState(0);
  const [maxSquareFeet, setMaxSquareFeet] = useState(0);

  const handleMinSquareFeetChange = (e) => {
    const value = Number(e.target.value);
    setMinSquareFeet(value);
    filterFunctions?.handlesquirefeet([value, maxSquareFeet]);
  };

  const handleMaxSquareFeetChange = (e) => {
    const value = Number(e.target.value);
    setMaxSquareFeet(value);
    filterFunctions?.handlesquirefeet([minSquareFeet, value]);
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            추가 필터
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">가격 범위  (만 원)</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">매물 유형</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[tradTpNmOptions[1]]}
                    name="colors"
                    options={tradTpNmOptions}
                    styles={customStyles}
                    onChange={(e) =>
                      filterFunctions?.setPropertyTypes([e.value])
                    }
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">거래 유형</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[catOptions[1]]}
                    name="colors"
                    options={catOptions}
                    styles={customStyles}
                    onChange={(e) =>
                      filterFunctions?.setPropertyTypes([e.value])
                    }
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}
          </div>
          {/* End .row */}
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">지역</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[locationOptions[0]]}
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom filterSelect"
                    value={{
                      value: filterFunctions?.location,
                      label: filterFunctions?.location,
                    }}
                    classNamePrefix="select"
                    onChange={(e) => filterFunctions?.handlelocation(e.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">평 수 (계약면적)</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={handleMinSquareFeetChange}
                        placeholder="최소"
                        id="minFeet3"
                      />
                      <span>{minSquareFeet > 0 ? `${(minSquareFeet * 3.3058).toFixed(2)}㎡` : ""}</span>
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="최대"
                        id="maxFeet3"
                        onChange={handleMaxSquareFeetChange}
                      />
                      <span>{maxSquareFeet > 0 ? `${(maxSquareFeet * 3.3058).toFixed(2)}㎡` : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">시설 정보</h6>
              </div>
            </div>
            <Amenities filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button type="submit" className="ud-btn btn-thm">
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;