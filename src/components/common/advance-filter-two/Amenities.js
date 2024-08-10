'use client'

const Amenities = ({filterFunctions}) => {
  const amenities = [
    [
      { label: "탑층"},
    { label: "고층"},
    { label: "중층"},
    { label: "저층"},
    ],
    [
      { label: "복층" },
      { label: "급매" },
      { label: "확장형" },
    { label: "역세권" },
    ],
    [
      { label: "올수리" },
      { label: "마당" },
      { label: "테라스" },
      { label: "주차가능" },
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
