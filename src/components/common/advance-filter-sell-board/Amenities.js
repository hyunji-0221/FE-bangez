'use client'

const Amenities = ({filterFunctions}) => {
  const amenities = [
    [
      { label: "편의점" },
    { label: "병원", defaultChecked: false },
    { label: "공원"  },
    { label: "초등학교"},
    ],
    [
      { label: "마트" },
      { label: "약국" },
      { label: "어린이집" },
    { label: "중학교" },
    ],
    [
      { label: "은행" },
      { label: "지하철" },
      { label: "유치원" },
      { label: "고등학교" },
    ],
  ];

  return (
    <>
      {amenities.map((column, columnIndex) => (
        <div className="col-sm-4" key={columnIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              {column.map((amenity, amenityIndex) => (
                <label className="custom_checkbox" key={amenityIndex}>
                  {amenity.label}
                  <input
                  checked={filterFunctions?.categories.includes(amenity.label)}
                  onChange={()=>filterFunctions?.handlecategories(amenity.label)}
                    type="checkbox"

                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities;
