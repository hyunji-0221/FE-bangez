"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import NearbySimilarProperty from "@/components/property/property-single-style/common-buy-board/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common-buy-board/OverView";
import PropertyAddress from "@/components/property/property-single-style/single-v5-buy-board/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/single-v5-buy-board/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common-buy-board/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/single-v5-buy-board/PropertyHeader";
import ContactWithAgent from "@/components/property/property-single-style/sidebar-buy-board/ContactWithAgent";
import ProperytyDescriptions from "@/components/property/property-single-style/common-buy-board/ProperytyDescriptions";
import PropertyGallery from "@/components/property/property-single-style/single-v5-buy-board/property-gallery";

import { API } from "@/app/api/common/API";

const SingleV5 = ({ params }) => {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);

  // 현재 매물 데이터 fetch 함수
  const fetchPropertyData = async () => {
    try {
      const response = await fetch(`${API.USERSERVER}/buy-article/detail?id=${params.id}`);
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

  const handleDelete = async () => {
    const confirmation = confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      try {
        const response = await fetch(`${API.USERSERVER}/buy-article/delete?id=${params.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("삭제되었습니다.");
          router.push("/buy-board");
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

  if (!propertyData || !similarProperties.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="pt30 pb90 bgc-f7">
        <div className="container">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30 ">제목</h4>
            {propertyData.postTitle}
            </div>

            <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30 ">내용</h4>
            <ProperytyDescriptions data={propertyData} />
          </div>
          {/* End .row */}

          <div className="row mt30 mt30-lg">
            <div className="col-lg-6">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">기본 조건</h4>
                <div className="row">
                  <OverView data={propertyData} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt0">상세 조건</h4>
                <div className="row">
                  <PropertyDetails data={propertyData} />
                </div>

              </div>
            </div>
            {/* End .col-8 */}
            <div className="col-lg-6">
              <div className="column">
                <style jsx>{`
                  .button-container {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                  }

                  .button-container .ud-btn {
                    flex: 1;
                    margin: 0 0px;
                    text-align: center;
                  }

                  .button-container .btn-edit {
                    margin-right: 10px;
                  }

                  .button-container .btn-delete {
                    margin-left: 10px;
                  }
                `}</style>

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">문의 하기</h4>
                  <ContactWithAgent />
                  <div className="mb-4"></div>
                  <div className="button-container">
                    <button className="ud-btn btn-thm btn-edit">수정하기</button>
                    <button className="ud-btn btn-thm btn-delete" onClick={handleDelete}>
                      삭제하기
                    </button>
                  </div>
                </div>
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">희망 편의시설</h4>
                  <div className="row">
                    {/* 여기서 가공한 데이터를 PropertyFeaturesAminites에 전달합니다. */}
                    <PropertyFeaturesAminites data={propertyData.parsedConvenient} />
                  </div>
                </div>
                {/* End .ps-widget */}
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V4  */}

      {/* Start similar-items  */}
      <section className="similar-items pt80 pb90">
        <div className="container">
          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">이런 글도 추천 드려요!</h2>
                <p className="paragraph">사람들이 올린 현재 판매 중인 매물이예요.</p>
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
            </div>
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
      </section>
      {/* End similar-items  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV5;
