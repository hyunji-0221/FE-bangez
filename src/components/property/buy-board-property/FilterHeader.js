import React from "react";

const FilterHeader = () => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="검색"
            required
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            정렬 :
          </span>
          <select className="form-select show-tick">
            <option>조회많은순</option>
            <option>추천순</option>
          </select>
        </div>
      </div>
      <a href="/buy-board-add" className="ud-btn btn-thm">
        글 작성하기
        <i className="fal fa-pencil-alt" />
      </a>
    </div>
  );
};

export default FilterHeader;