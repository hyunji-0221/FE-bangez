"use client";


import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import React, { useState } from "react";
import axios from "axios";
import DeductionPointFetch from "@/components/pages/pricing/DedectionPoint";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { API } from "@/app/api/common/API";

const AddPropertyForm: React.FC = () => {
  // 상태 변수 선언
  const [propertyData, setPropertyData] = useState({
    atclNm: "",
    rletTpNm: "",
    tradTpNm: "",
    flrInfo: "",
    prc: 0,
    rentPrc: 0,
    hanPrc: "",
    spc1: 0,
    spc2: 0,
    direction: "",
    lat: "",
    lng: "",
    atclFetrDesc: "",
    tagList: [] as string[],
    bildNm: "",
    town: "",
    roadAddress: "",
    address: "",
    image: "",
  });

  // 매물 정보 업데이트 핸들러
  const updatePropertyDescription = (data: Partial<typeof propertyData>) => {
    setPropertyData((prevData) => ({ ...prevData, ...data }));
  };

  // 위치 정보 업데이트 핸들러
  const updateLocation = (data: { lat: string; lng: string; roadAddress: string; address: string; town: string }) => {
    setPropertyData((prevData) => ({ ...prevData, ...data }));
  };

  // 편의시설 정보 업데이트 핸들러
  const updateAmenities = (data: { tagList: string[] }) => {
    setPropertyData((prevData) => ({ ...prevData, ...data }));
  };

  // 이미지 업데이트 핸들러
  const updateImage = (data: { image: string }) => {
    setPropertyData((prevData) => ({ ...prevData, ...data }));
  };

  const user = useUserStore((state) => state.user);
  const router = useRouter();

  // API 요청 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl =
      propertyData.rletTpNm === "오피스텔"
        ? `${API.LANDSERVER}/officetels`
        : `${API.LANDSERVER}/apartments`;
    try {
      const response = await axios.post(apiUrl, propertyData);
      if (response.status === 200) {
        console.log("apiUrl:", apiUrl);
        console.log("Property created:", response.data);

        // 성공 시 처리 로직

        // 포인트 차감
        const pointResult: any = await DeductionPointFetch(user?.id);
        console.log("DeductionPointFetch result:", pointResult); 

        if (pointResult === "SUCCESS") {
          console.log("매물이 성공적으로 등록되었습니다.")
          alert("매물이 성공적으로 등록되었습니다.");
        } else if (pointResult === "FAILURE") {
          alert("포인트가 부족합니다.");
          router.push("/dashboard-chargePint");
        } else if (user?.id === undefined) {
          alert("로그인이 필요합니다.");
          router.push("/login");
        }

      }
    } catch (error) {
      console.error("Error creating property:", error);
      // 오류 처리 로직
    }

  };

  return (
    <>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">매물 정보</h4>
            <PropertyDescription updateDescription={updatePropertyDescription} />

            <UploadMedia />
            {/* <UploadMedia updateImage={updateImage} /> */}
            <h4 className="title fz17 mb30">주소 등록</h4>
            <LocationField updateLocation={updateLocation} />

            <h4 className="title fz17 mb30">시설 정보</h4>
            <Amenities updateAmenities={updateAmenities} />

          </div>

        </div>

      </div>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">등록하기</button>
    </>
  );
};

export default AddPropertyForm;