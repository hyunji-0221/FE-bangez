"use client";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";

const AdvanceFilterModal = ({ filterFunctions }) => {
  const acceptForUseOptions = [
    { value: "Houses", label: "전체" },
    { value: "5년 이내", label: "5년 이내" },
    { value: "Apartments", label: "10년 이내" },
    { value: "Office", label: "15년 이내" },
    { value: "15년 이상", label: "15년 이상" },
  ];

  const parkingOptions = [
    { value: "Houses", label: "상관없음" },
    { value: "Apartments", label: "세대당 1대 이상" },
    { value: "Office", label: "세대당 2대 이상" },
  ];

  const moveHopeOptions = [
    { value: "All Cities", label: "즉시 입주" },
    { value: "California", label: "협의" },
  ];

  const numberOfAptOptions = [
    { value: "All Cities", label: "전체" },
    { value: "California", label: "100세대 미만" },
    { value: "ㅁㄴㅇ", label: "100세대 이상" },
    { value: "ㅇㄴ류", label: "500세대 이상" },
    { value: "늉", label: "1000세대 이상" },
  ];

  const floorOptions = [
    { value: "All Cities", label: "상관없음" },
    { value: "ㅈㄷㄹ", label: "저층" },
    { value: "ㅁㄺ", label: "고층" },

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
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          <div className="row">
          <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">사용 승인일</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[acceptForUseOptions[0]]}
                    name="colors"
                    options={acceptForUseOptions}
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
            </div>
            {/* End .col-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">면적</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            e.target.value,
                            document.getElementById("maxFeet3").value / 1,
                          ])
                        }
                        placeholder="Min."
                        id="minFeet3"
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="Max"
                        id="maxFeet3"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            document.getElementById("minFeet3").value / 1,
                            e.target.value,
                          ])
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
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
                <h6 className="list-title">주차대수</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[parkingOptions[0]]}
                    name="colors"
                    options={parkingOptions}
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
            </div>
            {/* End .col-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">입주 희망일</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[moveHopeOptions[0]]}
                    name="colors"
                    options={moveHopeOptions}
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
            </div>
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">세대수</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[numberOfAptOptions[0]]}
                    name="colors"
                    options={numberOfAptOptions}
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
            </div>
            {/* End .col-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">층수</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[floorOptions[0]]}
                    name="colors"
                    options={floorOptions}
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
            </div>
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}
          </div>
          {/* <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}
          {/* </div> */}
          {/* End .row */}

          {/* <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
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
            </div> */}
            {/* End .col-md-6 */}

            {/* End .col-md-6 */}
          {/* </div> */}
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">편의시설</h6>
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
            <u>모든 필터 초기화</u>
          </button>
          <div className="btn-area">
            <button type="submit" className="ud-btn btn-thm">
              <span className="flaticon-search align-text-top pr10" />
              검색
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
