"use client";

import React from "react";

const TopFilterBar = ({
  setCurrentSortingOption,
  colstyle,
  setColstyle,
  pageContentTrac,
}) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
          {pageContentTrac[2]}개 중{" "}
          {pageContentTrac[1]}개{" "}
            {/* {pageContentTrac[2] < pageContentTrac[1]
              ? pageContentTrac[2]
              : pageContentTrac[1]}{" "}개 */}
            표시중 
                
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "70px" }}>정렬 기준</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>최신등록순</option>
              <option>인기순</option>
              <option>추천순</option>
              <option>낮은가격순</option>
              <option>높은가격순</option>
            </select>
          </div>
          <div
            className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${
              colstyle ? "menuActive" : "#"
            } `}
            onClick={() => setColstyle(true)}
          >
            격자
          </div>
          <div
            className={`pl15 d-none d-md-block  cursor ${
              !colstyle ? "menuActive" : "#"
            }`}
            onClick={() => setColstyle(false)}
          >
            목록
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;