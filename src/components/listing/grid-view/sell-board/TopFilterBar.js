'use client'

import React from "react";
import ListingStatus from "../../sell-board-sidebar-plus/ListingStatus";
import PropertyType from "../../sell-board-sidebar-plus/PropertyType";
import PriceRangeTrade from "../../sell-board-sidebar-plus/PriceRangeTrade";
import PriceRangeMonth from "../../sell-board-sidebar-plus/PriceRangeMonth";
import PriceRangeRent from "../../sell-board-sidebar-plus/PriceRangeRent";
import Bedroom from "../../sell-board-sidebar-plus/Bedroom";
import Bathroom from "../../sell-board-sidebar-plus/Bathroom";

const TopFilterBar = ({filterFunctions,setCurrentSortingOption,colstyle,setColstyle}) => {
  
  return (
    <>
      <div className="col-xl-9 d-none d-lg-block">
        <div className="dropdown-lists">
          <ul className="p-0 text-center text-xl-start">
            

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                거래 유형<i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h5 className="list-title">거래 유형 (중복 선택 가능)</h5>
                  <div className="checkbox-style1">
                    <PropertyType filterFunctions={filterFunctions}/>
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    적용
                  </button>
                </div>
              </div>
            </li>
            {/* End li Property Type */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                주거 형태<i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h5 className="list-title">건물 유형</h5>
                  <div className="radio-element">
                    <ListingStatus filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn"
                  >
                    적용
                  </button>
                </div>
              </div>
            </li>
            {/* End li Listing Status */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                가격 <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h5 className="list-title">가격 범위</h5>
                  {/* Range Slider Desktop Version */}
                  {
                    /*
                    if(선택한 상태 === 전세){
                    return
                    1번 컴포넌트
                    }
                    if(선택한 상태 === 월세){
                    return
                    2번 컴포넌트
                    }
                    if(선택한 상태 === 매매){
                    return
                    3번 컴포넌트
                    }
                    */
                  }
                  <h6 className="list-title">보증금 / 전세금 (단위:만)</h6>
                  <div className="range-slider-style1">
                    <PriceRangeRent filterFunctions={filterFunctions}/>
                  </div>
                  <br></br>
                  <h6 className="list-title">월세 (단위:만)</h6>
                  <div className="range-slider-style1">
                    <PriceRangeMonth filterFunctions={filterFunctions}/>
                  </div>
                  <br></br>
                  <h6 className="list-title">매매 (단위:만)</h6>
                  <div className="range-slider-style1">
                    <PriceRangeTrade filterFunctions={filterFunctions}/>
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    적용
                  </button>
                </div>
              </div>
            </li>
            {/* End li Price */}

            

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                방 / 화장실 <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd4 pb20">
                <div className="widget-wrapper pl20 pr20">
                  <h5 className="list-title">방</h5>
                  <div className="d-flex">
                    <Bedroom filterFunctions={filterFunctions}/>
                  </div>
                </div>

                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h5 className="list-title">화장실</h5>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions}/>
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn4"
                  >
                    적용
                  </button>
                </div>
              </div>
            </li>
            {/* End bed and bathroom check */}

            <li className="list-inline-item">
              {/* Advance Features modal trigger */}
              <button
                type="button"
                className="open-btn mb15"
                data-bs-toggle="modal"
                data-bs-target="#advanceSeachModal"
              >
                <i className="flaticon-settings me-2" /> 추가 필터
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col-9 */}

      <div className="col-xl-3">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select className="form-select" onChange={(e)=>setCurrentSortingOption && setCurrentSortingOption(e.target.value)} >
              <option>최신등록순</option>
              <option>조회수많은순</option>
              <option>추천순</option>
              <option>낮은가격순</option>
              <option>높은가격순</option>
            </select>
          </div>
          <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block  cursor ${!colstyle? 'menuActive':'#' } `}    onClick={()=>setColstyle(false)}>
            Grid
          </div>
          <div className={`pl15 d-none d-md-block  cursor ${colstyle? 'menuActive':'#' }`}   onClick={()=>setColstyle(true)}>
            List
          </div>
        </div>
      </div>
      {/* End .col-3 */}
    </>
  );
};

export default TopFilterBar;
