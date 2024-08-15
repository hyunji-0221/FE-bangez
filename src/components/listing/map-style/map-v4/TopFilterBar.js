
'use client'

import React from "react";

const TopFilterBar = ({setCurrentSortingOption,colstyle,setColstyle,pageContentTrac}) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
          {pageContentTrac[2]}개 중 {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} 결과
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>정렬</span>
            <select className="form-select"  onChange={(e)=>setCurrentSortingOption && setCurrentSortingOption(e.target.value)}>
              <option>최신순</option>
              <option>인기순</option>
              <option>추천순</option>
              <option>가격 낮은 순</option>
              <option>가격 높은 순</option>
            </select>
          </div>
          
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
