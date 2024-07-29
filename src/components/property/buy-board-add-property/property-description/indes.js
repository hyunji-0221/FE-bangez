"use client";
import Select from "react-select";

const PropertyDescription = () => {
  const catergoryOptions = [
    { value: "아파트", label: "아파트" },
    { value: "오피스텔", label: "오피스텔" },
    
  ];
  const listedIn = [
    { value: "매매", label: "매매" },
    { value: "전세", label: "전세" },
    { value: "월세", label: "월세" },
  ];
  const PropertyStatus = [
    { value: "전체", label: "전체" },
    { value: "강남구", label: "강남구" },
    { value: "서초구", label: "서초구" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">제목</label>
            <input
              type="text"
              className="form-control"
              placeholder="제목 입력"
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              내용
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="내용을 작성해 주세요."
              defaultValue={""}
              required
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              건물 유형
            </label>
            <div className="location-area">
              <Select
                defaultValue={[catergoryOptions[0]]}
                name="colors"
                options={catergoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              거래 유형
            </label>
            <div className="location-area">
              <Select
                defaultValue={[listedIn[0]]}
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              지역
            </label>
            <div className="location-area">
              <Select
                defaultValue={[PropertyStatus[0]]}
                name="colors"
                options={PropertyStatus}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              보증금 / 전세금 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              월세 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              매매 (단위 : 만)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="작성 필요시 숫자만 입력"
            />
          </div>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default PropertyDescription;