'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'; // next/navigation에서 useSearchParams 사용
import TopFilterBar2 from './TopFilterBar2';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings'; //목록
import PaginationTwo from '../../PaginationTwo';
import Map from '../MapTest';
import { Property } from '@/module/property/Property';
import { API } from '@/app/api/common/API';
const fetchProperties = async (): Promise<Property[]> => {
  try {
    const API_OFFICETELS = `${API.LANDSERVER}/officetels`;
    const API_APARTMENTS = `${API.LANDSERVER}/apartments`;
    const [officetelsResponse, apartmentsResponse] = await Promise.all([
      axios.get(API_OFFICETELS),
      axios.get(API_APARTMENTS),
    ]);
    let properties = [...officetelsResponse.data, ...apartmentsResponse.data];
    return properties;
  } catch (error) {
    console.error('Failed to fetch data from the server', error);
    return [];
  }
};
const PropertyFilteringMapFive: React.FC = () => {
  const searchParams = useSearchParams(); // useSearchParams 훅 사용
  const typeParam = searchParams.get('type'); // 쿼리 파라미터에서 'type' 가져오기
  const initialListingStatus = typeParam ? typeParam.toString() : '전체'; // 기본 상태를 '전체'로 설정
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [currentSortingOption, setCurrentSortingOption] = useState('최신순');
  const [sortedFilteredData, setSortedFilteredData] = useState<Property[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState<Property[]>([]);
  const [pageContentTrac, setPageContentTrac] = useState<number[]>([]);
  const [listingStatus, setListingStatus] = useState(initialListingStatus); // 쿼리 파라미터 기반 초기 상태 설정
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState('전체');
  const [squirefeet, setSquirefeet] = useState<number[]>([]);
  const [yearBuild, setyearBuild] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  // 페이지 당 항목 수 설정
  const pageCapacity = 8;
  const resetFilter = () => {
    setListingStatus('전체');
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation('전체');
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption('최신순');
    document.querySelectorAll<HTMLInputElement>('.filterInput').forEach((element) => {
      element.value = '';
    });
    document.querySelectorAll<HTMLSelectElement>('.filterSelect').forEach((element) => {
      element.value = '전체';
    });
  };
  const filterFunctions = {
    handlelistingStatus: (elm: string) => setListingStatus((prev) => (prev === elm ? '전체' : elm)),
    handlepropertyTypes: (elm: string) =>
      setPropertyTypes((prev) => (prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm])),
    handlepriceRange: setPriceRange,
    handlebedrooms: setBedrooms,
    handlebathroms: setBathroms,
    handlelocation: setLocation,
    handlesquirefeet: setSquirefeet,
    handleyearBuild: setyearBuild,
    handlecategories: (elm: string) =>
      setCategories((prev) => (prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm])),
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };
  useEffect(() => {
    const fetchAndSetProperties = async () => {
      const properties = await fetchProperties();
      setProperties(properties);
      setFilteredData(properties.filter(property => property.rletTpNm === initialListingStatus)); // 초기 필터링 설정
    };
    fetchAndSetProperties();
  }, [initialListingStatus]);
  useEffect(() => {
    const refItems = properties.filter((elm) => {
      if (listingStatus === '전체') {
        return true;
      } else if (listingStatus === '아파트') {
        return elm.rletTpNm === '아파트';
      } else if (listingStatus === '오피스텔') {
        return elm.rletTpNm === '오피스텔';
      } else if (listingStatus === '매매') {
        return elm.tradTpNm === '매매';
      } else if (listingStatus === '전세') {
        return elm.tradTpNm === '전세';
      } else if (listingStatus === '월세') {
        return elm.tradTpNm === '월세';
      }
      return false;
    });
    // 지역 필터링 추가
    const locationFilteredItems = location === '전체'
      ? refItems
      : refItems.filter((elm) => elm.town.includes(location));
    let filteredArrays: Property[][] = [];
    if (priceRange.length > 0) {
      const filtered = locationFilteredItems.filter(
        (elm) =>
          Number(elm.prc) >= priceRange[0] &&
          Number(elm.prc) <= priceRange[1]
      );
      filteredArrays.push(filtered);
    }
    if (squirefeet.length > 0 && squirefeet[1]) {
      const filtered = locationFilteredItems.filter(
        (elm) =>
          (elm.spc1 * 0.3025) >= squirefeet[0] &&
          (elm.spc1 * 0.3025) <= squirefeet[1]
      );
      filteredArrays.push(filtered);
    }
    if (propertyTypes.length > 0) {
      filteredArrays.push(locationFilteredItems.filter((elm) => propertyTypes.includes(elm.rletTpNm)));
    }
    filteredArrays.push(locationFilteredItems.filter((el) => el.spc1 >= bedrooms));
    filteredArrays.push(locationFilteredItems.filter((el) => el.spc2 >= bathroms));
    const commonItems = locationFilteredItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setFilteredData(commonItems);
  }, [
    properties,
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    searchQuery,
  ]);
  useEffect(() => {
    if (currentSortingOption === '최신순') {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => {
          const dateA = a.atclCfmYmd ? parseInt(a.atclCfmYmd.substring(0, 4)) : 0;
          const dateB = b.atclCfmYmd ? parseInt(b.atclCfmYmd.substring(0, 4)) : 0;
          return dateB - dateA;
        })
      );
    } else if (currentSortingOption === '가격 낮은 순') {
      setSortedFilteredData([...filteredData].sort((a, b) => a.prc - b.prc));
    } else if (currentSortingOption === '가격 높은 순') {
      setSortedFilteredData([...filteredData].sort((a, b) => b.prc - a.prc));
    }
  }, [filteredData, currentSortingOption]);
  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * pageCapacity, pageNumber * pageCapacity));
    setPageContentTrac([((pageNumber - 1) * pageCapacity) + 1, pageNumber * pageCapacity, sortedFilteredData.length]);
  }, [pageNumber, sortedFilteredData, pageCapacity]);
  return (
    <>
      <section className="advance-search-menu bg-white position-relative default-box-shadow2 pt15 pb5 bb1 dn-992">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="advance-search-list no-box-shadow d-flex justify-content-center">
                <div className="dropdown-lists">
                  <ul className="p-0 mb-0">
                    <TopFilterBar2 filterFunctions={filterFunctions} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="advance-feature-modal">
          <div className="modal fade" id="advanceSeachModal" tabIndex={-1} aria-labelledby="advanceSeachModalLabel" aria-hidden="true">
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
      </section>
      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">
            <div className="col-xl-7 overflow-hidden position-relative">
              <div className="half_map_area map-canvas half_style">
                <Map properties={pageItems} />
              </div>
            </div>
            <div className="col-xl-5">
              <div className="half_map_area_content mt30">
                <h4 className="mb-1">서울시 매물 정보</h4>
                <div className="row align-items-center mb10">
                  <TopFilterBar pageContentTrac={pageContentTrac} colstyle={colstyle} setColstyle={setColstyle} setCurrentSortingOption={setCurrentSortingOption} />
                </div>
                <div className="row">
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>
                <div className="row text-center">
                  <PaginationTwo pageCapacity={pageCapacity} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PropertyFilteringMapFive;