import React, { useState } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

// 옵션의 타입 정의
interface Option {
  value: string;
  label: string;
}

const categoryOptions: Option[] = [
  { value: "아파트", label: "아파트" },
  { value: "오피스텔", label: "오피스텔" },
  { value: "주택", label: "주택" },
];

const listedIn: Option[] = [
  { value: "매매", label: "매매" },
  { value: "전세", label: "전세" },
  { value: "월세", label: "월세" },
];

// 스타일 타입 정의
const customStyles: StylesConfig<Option, false> = {
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#eb6753" : isFocused ? "#eb675312" : undefined,
      color: isSelected ? "#ffffff" : "#000000",
      cursor: "pointer",
    };
  },
};

interface PropertyDescriptionProps {
  updateDescription: (data: Partial<{
    atclNm: string;
    rletTpNm: string;
    tradTpNm: string;
    flrInfo: string;
    prc: number;
    rentPrc: number;
    hanPrc: string;
    spc1: number;
    spc2: number;
    direction: string;
    bildNm: string;
    atclFetrDesc: string;
    
  }>) => void;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ updateDescription }) => {
  const [transactionType, setTransactionType] = useState<string>(listedIn[1].value); // 초기값 설정
  const [propertyType, setPropertyType] = useState<string>(categoryOptions[0].value);
  const [atclNm, setAtclNm] = useState<string>("");
  const [bildNm, setBildNm] = useState<string>("");
  const [flrInfo, setFlrInfo] = useState<string>(""); // 실제 저장할 값
  const [spc1, setSpc1] = useState<number>(0); // 평 수
  const [direction, setDirection] = useState<string>("");
  const [prc, setPrc] = useState<number>(0);
  const [hanPrc, setHanPrc] = useState<string>("");
  const [rentPrc, setRentPrc] = useState<number>(0);
  const [atclFetrDesc, setAtclFetrDesc] = useState<string>("");

  // 거래 종류 변경 핸들러
  const handleTransactionTypeChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setTransactionType(selectedOption.value);
      updateDescription({ tradTpNm: selectedOption.value });
    }
  };

  // 매물 유형 변경 핸들러
  const handlePropertyTypeChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setPropertyType(selectedOption.value);
      updateDescription({ rletTpNm: selectedOption.value });
    }
  };

  // 폼 데이터 변경 시 부모 컴포넌트로 업데이트
  const handleChange = (field: string, value: any) => {
    updateDescription({ [field]: value });
  };

  // 평 수 변경 핸들러
  const handleSpaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpc1(value);
    handleChange("spc1", value);
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">매물 유형</label>
            <div className="location-area">
              <Select
                defaultValue={[categoryOptions[0]]}
                name="category"
                options={categoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={handlePropertyTypeChange}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">거래 종류</label>
            <div className="location-area">
              <Select
                defaultValue={listedIn[1]}
                name="transactionType"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={handleTransactionTypeChange}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">아파트/상가 명</label>
            <input
              type="text"
              className="form-control"
              placeholder="예) 에코델타호반써밋스마트시티"
              onChange={(e) => handleChange("atclNm", e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">동 입력</label>
            <input
              type="text"
              className="form-control"
              placeholder="예) 101동"
              onChange={(e) => handleChange("bildNm", e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">층수 입력</label>
            <input
              type="text"
              className="form-control"
              placeholder="예) 20"
              value={flrInfo}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
                setFlrInfo(value); // 실제 저장할 값
                handleChange("flrInfo", value);
              }}
            />
            <span>{flrInfo ? `${flrInfo}층` : ""}</span> {/* 층수 표시 */}
          </div>
        </div>
        {/* End .col-6 */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">매물 크기 (평)</label>
            <input
              type="number"
              className="form-control"
              placeholder="평 수 입력"
              onChange={handleSpaceChange}
            />
            <span>{spc1 > 0 ? `${(spc1 * 3.3058).toFixed(2)}㎡` : ""}</span> {/* 제곱미터 표시 */}
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">방향</label>
            <input
              type="text"
              className="form-control"
              placeholder="ex)남향"
              onChange={(e) => handleChange("direction", e.target.value)}
            />
          </div>
        </div>
        {(transactionType === "매매" || transactionType === "전세") && (
          <div className="col-sm-6 col-xl-4">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">가격</label>
              <input
                type="number"
                className="form-control"
                placeholder="(만 원)"
                onChange={(e) => handleChange("prc", Number(e.target.value))}
              />
            </div>
          </div>
        )}
        {/* End .col-6 */}

        {(transactionType === "전세" || transactionType === "월세") && (
          <div className="col-sm-6 col-xl-4">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">보증금</label>
              <input
                type="text"
                className="form-control"
                placeholder="(만 원)"
                onChange={(e) => handleChange("hanPrc", e.target.value)}
                
              />
              
            </div>
          </div>
        )}
        {/* End .col-6 */}

        {transactionType === "월세" && (
          <div className="col-sm-6 col-xl-4">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">월세</label>
              <input
                type="number"
                className="form-control"
                placeholder="(만 원)"
                onChange={(e) => handleChange("rentPrc", Number(e.target.value))}
              />
            </div>
          </div>
        )}
        {/* End .col-6 */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">상세 설명</label>
            <textarea
              cols={30}
              rows={5}
              placeholder="매물 상세 페이지에 노출되는 문구입니다."
              defaultValue={""}
              onChange={(e) => handleChange("atclFetrDesc", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default PropertyDescription;