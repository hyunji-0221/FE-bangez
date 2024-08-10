'use client'
import React, { useState, useEffect } from 'react';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import PaginationTwo from "@/components/listing/PaginationTwo";
import ListingSidebar from "@/components/listing/sidebar-apt";
import FeaturedListings from "./FeatuerdListings";
import { getSchool } from "@/components/statistics-api/StatisticsAPI";
import TopFilterBar from './TopFilterBar';

interface Listing {
    address: string;
    homepage: string;
    schoolName: string;
    schoolType: string;
}

export function SchoolFiltering() {
  const [filteredData, setFilteredData] = useState<Listing[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState<Listing[]>([]);
  const [pageContentTrac, setPageContentTrac] = useState<number[]>([]);
  
  const [listingStatus, setListingStatus] = useState('모든 지역');
  const [listingRegion, setListingRegion] = useState('모든 학교');

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squareFeet, setSquareFeet] = useState<number[]>([]);
  const [yearBuild, setYearBuild] = useState([0, 2050]);
  const [categories, setCategories] = useState<string[]>([]);

  
  const filterFunctions = {
    handlelistingStatus: (elm: string) => setListingStatus(prev => prev === elm ? '모든 지역' : elm),
    handlelistingRegion: (elm: string) => setListingRegion(prev => prev === elm ? '모든 학교' : elm),

    handlepropertyTypes: (elm: string) => {
      if (elm === 'All') {
        setPropertyTypes([]);
      } else {
        setPropertyTypes(prev => prev.includes(elm) ? prev.filter(el => el !== elm) : [...prev, elm]);
      }
    },
    

    priceRange,
    listingStatus,
    listingRegion,

    propertyTypes,

    categories,
    setPropertyTypes
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getSchool();
        const transformedData = rawData.map((item: any) => ({
          address: item.address,
          homepage: item.homepage,
          schoolName: item.schoolName,
          schoolType: item.schoolType
        }));
  
        // 필터링 로직 추가
        const filtered = listingStatus === '모든 지역'
        ? transformedData
        : transformedData.filter((item: { address: string; }) => {
            const parts = item.address.split(' ');
            return parts[1] === listingStatus;
          });
      
      const secFiltered = listingRegion === '모든 학교'
        ? filtered
        : filtered.filter((item: { schoolType: string; }) => {
            return item.schoolType === listingRegion;
          });
      
      setFilteredData(secFiltered);
      
      
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [listingStatus, listingRegion, propertyTypes, priceRange, bedrooms, bathrooms, location, squareFeet, yearBuild, categories]);
  

  useEffect(() => {
    setPageNumber(1);
  }, [filteredData]);
  
  useEffect(() => {
    const startIndex = (pageNumber - 1) * 9;
    const endIndex = pageNumber * 9;
    setPageItems(filteredData.slice(startIndex, endIndex));
    setPageContentTrac([startIndex + 1, endIndex, filteredData.length]);
  }, [pageNumber, filteredData]);

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        {/* Mobile filter sidebar */}
        <div className="offcanvas offcanvas-start p-0" tabIndex={-1} id="listingSidebarFilter" aria-labelledby="listingSidebarFilterLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">Listing Filter</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

        </div>

        {/* Advance Feature Modal */}
        <h5>현재 {listingStatus}의 {listingRegion}를 보는 중 입니다.</h5>


        <div className="row">
          <TopFilterBar pageContentTrac={pageContentTrac} colstyle={colstyle} setColstyle={setColstyle} filterFunctions={filterFunctions} />
        </div>

        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} schools={filteredData}/>
        </div>

        <div className="row">
          <PaginationTwo pageCapacity={9} data={filteredData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
    </section>
  );
}
