

'use client'

import React from "react";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import ListingStatus from "../../sidebar/ListingStatus";

const TopFilterBar2 = ({filterFunctions}) => {
  return (
    <>
      
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          거래 유형 <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">거래 유형</h6>
            <div className="radio-element">
              <ListingStatus  filterFunctions={filterFunctions}  />
            </div>
          </div>
          <div className="text-end mt10 pr10" >
            {/* <button type="button" 
            className="done-btn ud-btn btn-thm drop_btn" 
            data-bs-auto-close="true">
              완료
            </button> */}
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
          매물 유형 <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">매물 유형</h6>
            <div className="checkbox-style1">
              <PropertyType  filterFunctions={filterFunctions}  />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            
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
          가격 <i className="fa fa-angle-down ms-2" />
        </button>

        <div className="dropdown-menu dd3">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">가격 범위</h6>
            {/* Range Slider Desktop Version */}
            <div className="range-slider-style1">
              <PriceRange  filterFunctions={filterFunctions}  />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            {/* <button type="button" className="done-btn ud-btn btn-thm drop_btn3">
              Done
            </button> */}
          </div>
        </div>
      </li>
      {/* End li Price */}
{/* 
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          Beds / Baths <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu dd4 pb20">
          <div className="widget-wrapper pl20 pr20">
            <h6 className="list-title">Bedrooms</h6>
            <div className="d-flex">
              <Bedroom   filterFunctions={filterFunctions} />
            </div>
          </div>

          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Bathrooms</h6>
            <div className="d-flex">
              <Bathroom   filterFunctions={filterFunctions} />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button type="button" className="done-btn ud-btn btn-thm drop_btn4">
              Done
            </button>
          </div>
        </div>
      </li> */}
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
    </>
  );
};

export default TopFilterBar2;
