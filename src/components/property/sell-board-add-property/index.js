'use client'

import React, { useState } from "react";
import PropertyDescription from "./property-description";
import DetailsFiled from "./details-field";
import { useRouter } from 'next/navigation';


const AddPropertyTabContent = () => {
  const [propertyData, setPropertyData] = useState({
    postTitle: '',
    postContent: '',
    buildType: '아파트',
    tradeType: '매매',
    location: '전체',
    rentPrice: '',
    monthPrice: '',
    tradePrice: '',
  });

  const [detailsData, setDetailsData] = useState({
    size: '',
    roomCount: '',
    toiletCount: '',
    numberOfApt: '전체',
    acceptForUse: '전체',
    parking: '상관없음',
    convenient: [],
    floor: '상관없음',
    hopeMove: '즉시 입주',
    moreContent: '',
  });

  // PropertyDescription 컴포넌트에서 호출되는 함수
  const handlePropertyChange = (updates) => {
    setPropertyData(prevData => ({ ...prevData, ...updates }));
  };

  // DetailsFiled 컴포넌트에서 호출되는 함수
  const handleDetailsChange = (updates) => {
    setDetailsData(prevData => ({ ...prevData, ...updates }));
  };

  const router = useRouter(); //페이지 이동 라우터

  // 버튼 클릭 시 호출되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    try {
      console.log("보내는 데이터",propertyData.postTitle)

      const response = await fetch('http://localhost:8000/users/sell-article/save', { // 백엔드 API 엔드포인트에 맞게 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postTitle: propertyData.postTitle,
          postContent: propertyData.postContent,
          buildType: propertyData.buildType,
          tradeType: propertyData.tradeType,
          location: propertyData.location,
          rentPrice: propertyData.rentPrice,
          monthPrice: propertyData.monthPrice,
          tradePrice: propertyData.tradePrice,
          size: detailsData.size,
          roomCount: detailsData.roomCount,
          toiletCount: detailsData.toiletCount,
          numberOfApt: detailsData.numberOfApt,
          acceptForUse: detailsData.acceptForUse,
          parking: detailsData.parking,
          convenient: detailsData.convenient,
          floor: detailsData.floor,
          hopeMove: detailsData.hopeMove,
          moreContent: detailsData.moreContent
        }),
      });

      if (response.ok) {
        alert('작성 완료');
        console.log(propertyData)
        router.push('/sell-board/apt');  // 작성 완료 시 '/buy-board' 페이지로 이동
      } else {
        alert('작성 실패 내용을 확인해주세요.');
      }
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
      alert('제출 중 오류 발생.');
    }
  };

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. 내용
          </button>
          <button
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            2. 세부 사항
          </button>
        </div>
      </nav>
      <form onSubmit={handleSubmit}> {/* 폼 제출 시 handleSubmit 호출 */}
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-item1"
            role="tabpanel"
            aria-labelledby="nav-item1-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">내용 작성</h4>
              <PropertyDescription data={propertyData} onChange={handlePropertyChange} />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-item4"
            role="tabpanel"
            aria-labelledby="nav-item4-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">세부 사항 작성</h4>
              <DetailsFiled data={detailsData} onChange={handleDetailsChange} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPropertyTabContent;