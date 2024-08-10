'use client' // 이 파일이 클라이언트 측에서 실행되어야 함을 명시

import React, { useState, useEffect } from "react"; // React 라이브러리에서 필요한 훅을 불러옴
import ListingSidebar from "../../sell-board-sidebar"; // 사이드바 컴포넌트를 불러옴
import AdvanceFilterModal from "@/components/common/advance-filter-sell-board"; // 고급 필터 모달 컴포넌트를 불러옴
import TopFilterBar from "./TopFilterBar"; // 상단 필터 바 컴포넌트를 불러옴
import FeaturedListings from "./FeatuerdListings"; // 주요 리스트를 표시하는 컴포넌트를 불러옴
import PaginationTwo from "../../PaginationTwo"; // 페이지네이션 컴포넌트를 불러옴

export default function PropertyFiltering() {
  const [listings, setListings] = useState([]); // 모든 매물 데이터를 저장할 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 매물 데이터를 저장할 상태
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest"); // 현재 정렬 옵션을 저장할 상태
  const [sortedFilteredData, setSortedFilteredData] = useState([]); // 정렬된 필터링된 데이터를 저장할 상태
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호를 저장할 상태
  const [colstyle, setColstyle] = useState(false); // 컬럼 스타일을 저장할 상태 (리스트형/그리드형)
  const [pageItems, setPageItems] = useState([]); // 현재 페이지에 표시될 매물 아이템들을 저장할 상태
  const [pageContentTrac, setPageContentTrac] = useState([]); // 페이지 내 아이템 트래킹을 위한 상태

  // 컴포넌트가 처음 렌더링될 때 매물 데이터를 fetch로 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8082/sell-article/list'); // API 호출
        const data = await response.json(); // JSON 형태로 응답을 파싱
        setListings(data); // 가져온 데이터를 상태에 저장
        console.log(data); // 디버깅을 위한 콘솔 로그
        console.log("페이지 아이템", pageItems); // 디버깅을 위한 콘솔 로그
      } catch (error) {
        console.error('Error fetching listings:', error); // 에러 처리
      }
    };

    fetchData();
  }, []);

  // 페이지 번호가 변경될 때마다 페이지 아이템과 페이지 컨텐츠 트래킹 업데이트
  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9) // 현재 페이지에 해당하는 아이템 추출
    );
    setPageContentTrac([
      (pageNumber - 1) * 9 + 1, // 현재 페이지의 첫 아이템 번호
      pageNumber * 9, // 현재 페이지의 마지막 아이템 번호
      sortedFilteredData.length, // 총 필터링된 아이템 개수
    ]);
  }, [pageNumber, sortedFilteredData]);

  // 필터 상태를 저장하는 상태들
  const [listingStatus, setListingStatus] = useState("All"); // 매물 상태 (전체, 구매, 임대)
  const [propertyTypes, setPropertyTypes] = useState([]); // 매물 종류 필터 상태
  const [priceRange, setPriceRange] = useState([0, 100000]); // 가격 범위 필터 상태
  const [bedrooms, setBedrooms] = useState(0); // 침실 개수 필터 상태
  const [bathrooms, setBathrooms] = useState(0); // 욕실 개수 필터 상태
  const [location, setLocation] = useState("All Cities"); // 위치 필터 상태
  const [squirefeet, setSquirefeet] = useState([]); // 평수 필터 상태
  const [yearBuild, setYearBuild] = useState([]); // 건축 연도 필터 상태
  const [categories, setCategories] = useState([]); // 기타 카테고리 필터 상태

  // 필터를 초기화하는 함수
  const resetFilter = () => {
    setListingStatus("All"); // 매물 상태 초기화
    setPropertyTypes([]); // 매물 종류 초기화
    setPriceRange([0, 100000]); // 가격 범위 초기화
    setBedrooms(0); // 침실 개수 초기화
    setBathrooms(0); // 욕실 개수 초기화
    setLocation("All Cities"); // 위치 초기화
    setSquirefeet([]); // 평수 초기화
    setYearBuild([0, 2050]); // 건축 연도 초기화
    setCategories([]); // 카테고리 초기화
    setCurrentSortingOption("Newest"); // 정렬 옵션 초기화
    document.querySelectorAll(".filterInput").forEach((element) => {
      element.value = null; // 필터 입력 필드를 초기화
    });

    document.querySelectorAll(".filterSelect").forEach((element) => {
      element.value = "All Cities"; // 필터 선택 필드를 초기화
    });
  };

  // 필터링 관련 핸들러 함수들 (상태 업데이트)
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

  // 필터링과 관련된 함수들을 하나의 객체로 묶음
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

  // 매물 데이터를 필터링하는 로직
  useEffect(() => {
    
    const refItems = listings.filter((elm) => {
      if (listingStatus === "All") {
        return true; // 모든 매물 포함
      } else if (listingStatus === "Buy") {
        return !elm.forRent; // 구매용 매물만 포함
      } else if (listingStatus === "Rent") {
        return elm.forRent; // 임대용 매물만 포함
      }
    });

    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      const filtered = refItems.filter((elm) =>
        propertyTypes.includes(elm.tradeType)
      );
      filteredArrays = [...filteredArrays, filtered]; // 매물 종류 필터 적용
    }

    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.roomCount >= bedrooms), // 침실 개수 필터 적용
    ];

    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.toiletCount >= bathrooms), // 욕실 개수 필터 적용
    ];

    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems] // 카테고리 필터가 없으면 모든 매물 포함
        : refItems.filter((elm) =>
            categories.every((elem) => elm.features.includes(elem))
          ), // 모든 카테고리를 포함하는 매물만 포함
    ];

    if (location !== "All Cities") {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter((el) => el.location === location), // 위치 필터 적용
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
        ); // 가격 범위 필터 적용
      });
      filteredArrays = [...filteredArrays, filtered];
    }

    if (squirefeet.length > 0) {
      const filtered = refItems.filter(
        (elm) => elm.size >= squirefeet[0] && elm.size <= squirefeet[1] // 평수 필터 적용
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.yearBuild >= yearBuild[0] && elm.yearBuild <= yearBuild[1] // 건축 연도 필터 적용
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item)) // 모든 필터에 해당하는 매물만 선택
    );

    setFilteredData(commonItems); // 필터링된 데이터 상태 업데이트
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

  // 필터링된 데이터를 정렬하는 로직
  useEffect(() => {
    setPageNumber(1); // 페이지 번호를 1로 초기화
    if (currentSortingOption === "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuild - b.yearBuild // 가장 최근 건축된 매물부터 정렬
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
          Math.min(rentPriceB, monthPriceB, tradePriceB) // 최저가 기준 오름차순 정렬
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
          Math.max(rentPriceA, monthPriceA, tradePriceA) // 최고가 기준 내림차순 정렬
        );
      });
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData); // 정렬 옵션이 없을 경우 필터링된 데이터를 그대로 사용
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
            <ListingSidebar filterFunctions={filterFunctions} /> {/* 사이드바 필터 컴포넌트 */}
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
            <AdvanceFilterModal filterFunctions={filterFunctions} /> {/* 고급 필터 모달 컴포넌트 */}
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
          /> {/* 상단 필터 바 컴포넌트 */}
        </div>
        {/* End TopFilterBar */}

        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} /> {/* 주요 매물 리스트 컴포넌트 */}
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          /> {/* 페이지네이션 컴포넌트 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
