'use client'

import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sell-board-sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-sell-board";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { API } from "@/app/api/common/API";

export default function PropertyFiltering() {
  const [listings, setListings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API.USERSERVER}/sell-article/list`);
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9)
    );
    setPageContentTrac([
      (pageNumber - 1) * 9 + 1,
      pageNumber * 9,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setYearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach((element) => {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach((element) => {
      element.value = "All Cities";
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre === elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm === "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el !== elm)] : [...pre, elm]
      );
    }
  };

  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };

  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };

  const handlebathrooms = (elm) => {
    setBathrooms(elm);
  };

  const handlelocation = (elm) => {
    setLocation(elm);
  };

  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };

  const handleyearBuild = (elm) => {
    setYearBuild(elm);
  };

  const handlecategories = (elm) => {
    if (elm === "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el !== elm)] : [...pre, elm]
      );
    }
  };

  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathrooms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
  };

  useEffect(() => {
    const refItems = listings.filter((elm) => {
      if (listingStatus === "All") {
        return true;
      } else if (listingStatus === "Buy") {
        return !elm.forRent;
      } else if (listingStatus === "Rent") {
        return elm.forRent;
      }
    });

    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      const filtered = refItems.filter((elm) =>
        propertyTypes.includes(elm.propertyType)
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.roomCount >= bedrooms),
    ];

    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.toiletCount >= bathrooms),
    ];

    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) =>
            categories.every((elem) => elm.features.includes(elem))
          ),
    ];

    if (location !== "All Cities") {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter((el) => el.location === location),
      ];
    }

    if (priceRange.length > 0) {
      const filtered = refItems.filter((elm) => {
        const rentPrice = elm.rentPrice || 0;
        const monthPrice = elm.monthPrice || 0;
        const tradePrice = elm.tradePrice || 0;
        return (
          (rentPrice >= priceRange[0] && rentPrice <= priceRange[1]) ||
          (monthPrice >= priceRange[0] && monthPrice <= priceRange[1]) ||
          (tradePrice >= priceRange[0] && tradePrice <= priceRange[1])
        );
      });
      filteredArrays = [...filteredArrays, filtered];
    }

    if (squirefeet.length > 0) {
      const filtered = refItems.filter(
        (elm) => elm.size >= squirefeet[0] && elm.size <= squirefeet[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.yearBuild >= yearBuild[0] && elm.yearBuild <= yearBuild[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );

    setFilteredData(commonItems);
  }, [
    listings,
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
  ]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption === "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuild - b.yearBuild
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() === "Price Low") {
      const sorted = [...filteredData].sort((a, b) => {
        const rentPriceA = a.rentPrice || 0;
        const rentPriceB = b.rentPrice || 0;
        const monthPriceA = a.monthPrice || 0;
        const monthPriceB = b.monthPrice || 0;
        const tradePriceA = a.tradePrice || 0;
        const tradePriceB = b.tradePrice || 0;
        return (
          Math.min(rentPriceA, monthPriceA, tradePriceA) -
          Math.min(rentPriceB, monthPriceB, tradePriceB)
        );
      });
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() === "Price High") {
      const sorted = [...filteredData].sort((a, b) => {
        const rentPriceA = a.rentPrice || 0;
        const rentPriceB = b.rentPrice || 0;
        const monthPriceA = a.monthPrice || 0;
        const monthPriceB = b.monthPrice || 0;
        const tradePriceA = a.tradePrice || 0;
        const tradePriceB = b.tradePrice || 0;
        return (
          Math.max(rentPriceB, monthPriceB, tradePriceB) -
          Math.max(rentPriceA, monthPriceA, tradePriceA)
        );
      });
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            pageContentTrac={pageContentTrac}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
          />
        </div>
        {/* End TopFilterBar */}

        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} />
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
