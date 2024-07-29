'use client'

import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Location from "./Location";
import SquareFeet from "./SquareFeet";
import YearBuilt from "./YearBuilt";
import OtherFeatures from "./OtherFeatures";

const ListingSidebar2 = ({filterFunctions}) => {
  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">검색</h6>
        <SearchBox filterFunctions={filterFunctions} />
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">거래 유형</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">매물 유형</h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div>
      
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">가격</h6>
        {/* Range Slider Desktop Version */}
        <div className="range-slider-style1">
          <PriceSlider filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">침실</h6>
        <div className="d-flex">
          <Bedroom filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">화장실</h6>
        <div className="d-flex">
          <Bathroom filterFunctions={filterFunctions}  />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper advance-feature-modal">
        <h6 className="list-title">지역</h6>
        <div className="form-style2 input-group">
          <Location filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">면적</h6>
        <SquareFeet filterFunctions={filterFunctions}/>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">준공년도</h6>
        <YearBuilt filterFunctions={filterFunctions}/>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <div className="feature-accordion">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-none">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button border-none p-0 after-none feature-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span className="flaticon-settings" /> 추가 조건
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0 mt15">
                  <OtherFeatures filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button className="ud-btn btn-thm">
            <span className="flaticon-search align-text-top pr10" />
            검색
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div onClick={()=>filterFunctions.resetFilter()} className="reset-button cursor" href="#">
          <span className="flaticon-turn-back" />
          <u>필터 초기화</u>
        </div>
        <a className="reset-button" href="#">
          <span className="flaticon-favourite" />
          <u>검색 조건 저장</u>
        </a>
      </div>
    </div>
  );
};

export default ListingSidebar2;