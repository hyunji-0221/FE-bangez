'use client';

import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { CityMap } from "@/components/statistics/Map";
import React, { useState } from "react";

const GridFull3Col = () => {
  const districts = [
    { name: "강남구", coords: { lat: 37.517236, lng: 127.047325 } },
    { name: "강동구", coords: { lat: 37.530193, lng: 127.123792 } },
    { name: "강북구", coords: { lat: 37.639751, lng: 127.025674 } },
    { name: "강서구", coords: { lat: 37.550964, lng: 126.849532 } },
    { name: "관악구", coords: { lat: 37.478406, lng: 126.951613 } },
    { name: "광진구", coords: { lat: 37.538631, lng: 127.082098 } },
    { name: "구로구", coords: { lat: 37.495485, lng: 126.887334 } },
    { name: "금천구", coords: { lat: 37.456898, lng: 126.895244 } },
    { name: "노원구", coords: { lat: 37.654259, lng: 127.056559 } },
    { name: "도봉구", coords: { lat: 37.668888, lng: 127.046698 } },
    { name: "동대문구", coords: { lat: 37.574398, lng: 127.039766 } },
    { name: "동작구", coords: { lat: 37.512409, lng: 126.939999 } },
    { name: "마포구", coords: { lat: 37.566324, lng: 126.901636 } },
    { name: "서대문구", coords: { lat: 37.579112, lng: 126.936893 } },
    { name: "서초구", coords: { lat: 37.483574, lng: 127.032598 } },
    { name: "성북구", coords: { lat: 37.589399, lng: 127.016694 } },
    { name: "성동구", coords: { lat: 37.563344, lng: 127.036871 } },
    { name: "송파구", coords: { lat: 37.514544, lng: 127.105602 } },
    { name: "양천구", coords: { lat: 37.516975, lng: 126.866598 } },
    { name: "영등포구", coords: { lat: 37.526014, lng: 126.896704 } },
    { name: "용산구", coords: { lat: 37.531100, lng: 126.981074 } },
    { name: "은평구", coords: { lat: 37.602722, lng: 126.929273 } },
    { name: "종로구", coords: { lat: 37.573275, lng: 126.979367 } },
    { name: "중구", coords: { lat: 37.563988, lng: 126.997573 } },
    { name: "중랑구", coords: { lat: 37.606324, lng: 127.092559 } },
  ];

  // districts 배열을 반으로 나눔
  const leftDistricts = districts.slice(0, 13);
  const rightDistricts = districts.slice(13);

  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [centerCoords, setCenterCoords] = useState<{ lat: number, lng: number } | null>(null);

  const handleButtonClick = (district: { name: string, coords: { lat: number, lng: number } }) => {
    setSelectedDistrict(district.name);
    setCenterCoords(district.coords);
  };

  return (
    <>
      {/* 메인 헤더 네비게이션 */}
      <DefaultHeader />
      {/* 메인 헤더 네비게이션 종료 */}

      {/* 모바일 네비게이션 */}
      <MobileMenu />
      {/* 모바일 네비게이션 종료 */}

      {/* 빵부스러기 섹션 */}
      <section className="breadcumb-section bgc-f7" style={{ padding: '30px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">공원찾기</h2>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> 필터
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 빵부스러기 섹션 종료 */}

      {/* 필터 버튼과 지도 레이아웃 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 3fr 1fr', 
        gap: '10px', 
        width: '90%', 
        maxWidth: '1200px', 
        margin: 'auto', 
        height: '80vh' 
      }}>
        {/* 왼쪽 필터 버튼 컬럼 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: 'lightgray', 
          padding: '10px', 
          boxShadow: '0px 0px 10px rgba(100, 149, 237, 0.1)'
        }}>
          {leftDistricts.map((district, index) => (
            <button 
              key={index} 
              onClick={() => handleButtonClick(district)} // 버튼 클릭 시 선택된 구와 좌표 설정
              style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                backgroundColor: 'grey', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {district.name}
            </button>
          ))}
        </div>

        {/* 지도 영역 */}
        <div style={{ 
          backgroundColor: 'grey', 
          padding: '20px', 
          boxShadow: '0px 0px 10px rgba(100, 149, 237, 0.1)', 
          height: '100%', 
          width: '100%'
        }}>
          <CityMap selectedDistrict={selectedDistrict} centerCoords={centerCoords} />
        </div>

        {/* 오른쪽 필터 버튼 컬럼 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: 'lightgray', 
          padding: '10px', 
          boxShadow: '0px 0px 10px rgba(100, 149, 237, 0.1)'
        }}>
          {rightDistricts.map((district, index) => (
            <button 
              key={index} 
              onClick={() => handleButtonClick(district)} // 버튼 클릭 시 선택된 구와 좌표 설정
              style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                backgroundColor: 'grey', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {district.name}
            </button>
          ))}
        </div>
      </div>
      {/* 필터 버튼과 지도 레이아웃 종료 */}

      {/* 푸터 시작 */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* 푸터 종료 */}
    </>
  );
};

export default GridFull3Col;
