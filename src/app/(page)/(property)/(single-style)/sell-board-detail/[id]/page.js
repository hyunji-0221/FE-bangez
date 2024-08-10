"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import NearbySimilarProperty from "@/components/property/property-single-style/common-sell-board/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common-sell-board/OverView";
import PropertyAddress from "@/components/property/property-single-style/common-sell-board/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common-sell-board/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common-sell-board/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common-sell-board/PropertyHeader";
import ProperytyDescriptions from "@/components/property/property-single-style/common-sell-board/ProperytyDescriptions";
import ContactWithAgent from "@/components/property/property-single-style/sidebar-sell-board/ContactWithAgent";
import PropertyGallery from "@/components/property/property-single-style/single-v10-sell-board/PropertyGallery";

import { API } from "@/app/api/common/API";

const SingleV10 = ({ params }) => {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);

  const handleDelete = async () => {
    const confirmation = confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      try {
        const response = await fetch(`${API.USERSERVER}/sell-article/delete?id=${params.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("삭제되었습니다.");
          router.push("/sell-board"); // 삭제 후 리다이렉트할 경로 설정
        } else {
          alert("삭제 실패. 다시 시도해 주세요.");
          console.log(response);
        }
      } catch (error) {
        console.error("삭제 중 오류가 발생했습니다:", error);
        alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  // 현재 매물 데이터 fetch 함수
  const fetchPropertyData = async () => {
    try {
      const response = await fetch(`${API.USERSERVER}/sell-article/detail?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        // 편의시설 데이터를 파싱하여 배열로 만듭니다.
        if (data.convenient && data.convenient.length > 0) {
          data.parsedConvenient = data.convenient[0].replace(/\[|\]/g, '').split(',').map(item => item.trim());
        }
        setPropertyData(data);
      } else {
        console.error("Failed to fetch property data");
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  // 유사 매물 데이터 fetch 함수
  const fetchSimilarProperties = async () => {
    try {
      const response = await fetch(`${API.USERSERVER}/sell-article/list`);
      if (response.ok) {
        const data = await response.json();
        setSimilarProperties(data);
      } else {
        console.error("Failed to fetch similar properties");
      }
    } catch (error) {
      console.error("Error fetching similar properties:", error);
    }
  };

  useEffect(() => {
    fetchPropertyData();
    fetchSimilarProperties();
  }, []);

  if (!propertyData || !similarProperties.length) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    router.push(`/sell-board-update/${params.id}`); // 수정하기 페이지로 이동
  };

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt30 pb0 bgc-white">
        <div className="container">
          <div className="row mb30">
            <PropertyGallery id={params.id} />
          </div>
          {/* End .row */}

          <div className="row">
            <PropertyHeader id={params.id} />
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">기본 정보</h4>
                <div className="row">
                  <OverView />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">소개</h4>
                <ProperytyDescriptions />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">상세 정보</h4>
                <div className="row">
                  <PropertyDetails />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">주소</h4>
                <div className="row">
                  <PropertyAddress />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">특징 &amp; 편의시설</h4>
                <div className="row">
                  <PropertyFeaturesAminites />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="agen-personal-info position-relative bgc-f7 bdrs12 p30 mb30">
                <div className="widget-wrapper mb-0">
                  <h6 className="title fz17 mb30">문의 하기</h6>
                  <ContactWithAgent />
                </div>
              </div>
              <div className="d-flex justify-content-between mr-2">
                <button className="ud-btn btn-thm mx-4" onClick={handleEdit}>수정하기</button>
                <button className="ud-btn btn-thm mx-4" onClick={handleDelete}>삭제하기</button>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">이런 매물도 추천 드려요!</h2>
                <p className="paragraph">이 집을 본 사람들이 찾아본 매물</p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <NearbySimilarProperty similarProperties={similarProperties} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV10;
