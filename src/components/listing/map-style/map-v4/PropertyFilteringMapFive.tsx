'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopFilterBar2 from './TopFilterBar2';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings'; //목록
import PaginationTwo from '../../PaginationTwo';
import Map from '../Map';
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [currentSortingOption, setCurrentSortingOption] = useState('Newest');
  const [sortedFilteredData, setSortedFilteredData] = useState<Property[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState<Property[]>([]);
  const [pageContentTrac, setPageContentTrac] = useState<number[]>([]);
  const [listingStatus, setListingStatus] = useState('All');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squirefeet, setSquirefeet] = useState<number[]>([]);
  const [yearBuild, setyearBuild] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const resetFilter = () => {
    setListingStatus('All');
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation('All Cities');
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption('Newest');
    document.querySelectorAll<HTMLInputElement>('.filterInput').forEach((element) => {
      element.value = '';
    });

    document.querySelectorAll<HTMLSelectElement>('.filterSelect').forEach((element) => {
      element.value = 'All Cities';
    });
  };

  const filterFunctions = {
    handlelistingStatus: (elm: string) => setListingStatus((prev) => (prev === elm ? 'All' : elm)),
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
      setFilteredData(properties);
    };

    fetchAndSetProperties();
  }, []);

  useEffect(() => {
    const refItems = properties.filter((elm) => {
      if (listingStatus === 'All') {
        return true;
      } else if (listingStatus === 'Buy') {
        return !elm.forRent;
      } else if (listingStatus === 'Rent') {
        return elm.forRent;
      }
      return false;
    });

    let filteredArrays: Property[][] = [];
    if (propertyTypes.length > 0) {
      filteredArrays.push(refItems.filter((elm) => propertyTypes.includes(elm.rletTpNm)));
    }
    filteredArrays.push(refItems.filter((el) => el.spc1 >= bedrooms));
    filteredArrays.push(refItems.filter((el) => el.spc2 >= bathroms));

    const commonItems = refItems.filter((item) =>
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
    setPageNumber(1);
    if (currentSortingOption === 'Newest') {
      setSortedFilteredData([...filteredData].sort((a, b) => parseInt(b.atclCfmYmd.substring(0, 4)) - parseInt(a.atclCfmYmd.substring(0, 4))));
    } else if (currentSortingOption === 'Price Low') {
      setSortedFilteredData([...filteredData].sort((a, b) => a.prc - b.prc));
    } else if (currentSortingOption === 'Price High') {
      setSortedFilteredData([...filteredData].sort((a, b) => b.prc - a.prc));
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * 4, pageNumber * 4));
    setPageContentTrac([((pageNumber - 1) * 4) + 1, pageNumber * 4, sortedFilteredData.length]);
  }, [pageNumber, sortedFilteredData]);

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
                <h4 className="mb-1">Seoul Homes for Sale</h4>
                <div className="row align-items-center mb10">
                  <TopFilterBar pageContentTrac={pageContentTrac} colstyle={colstyle} setColstyle={setColstyle} setCurrentSortingOption={setCurrentSortingOption} />
                </div>
                <div className="row">
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>
                <div className="row text-center">
                  <PaginationTwo pageCapacity={4} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
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