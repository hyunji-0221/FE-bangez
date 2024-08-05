'use client'

import React from "react";
import PropertyType from "@/components/listing/sidebar/PropertyType";
import PriceRange from "@/components/listing/sidebar/PriceRange";
import Bedroom from "@/components/listing/sidebar/Bedroom";
import Bathroom from "@/components/listing/sidebar/Bathroom";
import ListingStatus from "./ListingStatus";

export const TopFilterBar = ({filterFunctions,setCurrentSortingOption,colstyle,setColstyle}: any) => {
  
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
                행정구 <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">행정구역 목록</h6>
                  <div className="radio-element">
                    <ListingStatus filterFunctions={filterFunctions} />
                  </div>
                </div>

              </div>
            </li>

 

          </ul>
        </div>
      </div>
      {/* End .col-9 */}

      <div className="col-xl-3">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">

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
