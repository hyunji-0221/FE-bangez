"use client";

import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/single-v5/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/single-v5/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/single-v5/PropertyHeader";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v5/property-gallery";
import fetchPropertyById from "@/app/api/property/route";
import { useEffect, useState } from 'react';
import { Property } from '@/module/property/Property';
import { useParams, useSearchParams } from 'next/navigation';
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";

const SingleV5: React.FC = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const rletTpNm = searchParams.get('rletTpNm');

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchAndSetProperty = async () => {
      if (id && rletTpNm) {
        try {
          console.log(`Fetching property with id: ${id}, type: ${rletTpNm}`);
          const data: Property | null = await fetchPropertyById(id as string);
          console.log('Fetched data:', data);
          setProperty(data);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      } else {
        console.log('ID or rletTpNm is missing', id, rletTpNm);
      }
    };

    fetchAndSetProperty();
  }, [id, rletTpNm]);

  console.log('Property state:', property);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
{/* 대문 */}
      <section className="p-0 bgc-white">
        <PropertyGallery property={property} />
      </section>

      <section className="pt30 pb90 bgc-f7">
        <div className="container">
          <div className="row sp-v5-property-details">
            <PropertyHeader property={property} />
          </div>

          <div className="row mt50 mt30-lg">
            <div className="col-lg-6">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview                  
                </h4>
                <div className="row">
                  <OverView property={property} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">
                  한줄 설명
                </h4>
                <ProperytyDescriptions property={property} />

                <h4 className="title fz17 mb30 mt50">상세 정보</h4>
                <div className="row">
                  <PropertyDetails property={property} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">주소</h4>
                <div className="row">
                  <PropertyAddress property={property} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">시설 정보</h4>
                <div className="row">
                  <PropertyFeaturesAminites property={property} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">평면도</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="column">
                {/* <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Schedule a tour</h4>
                  <p className="text">Choose your preferred day</p>
                  <ScheduleTour property={property} />
                </div> */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">문의하기</h4>
                  <InfoWithForm property={property} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleV5;