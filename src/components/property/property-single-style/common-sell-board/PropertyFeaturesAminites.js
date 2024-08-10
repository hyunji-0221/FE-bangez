import React from "react";

const PropertyFeaturesAminites = () => {
  const featuresAmenitiesData = [
    ["헬스장","병원","초등학교"],
    ["편의점","약국","중학교"],
    ["수영장","지하철","고등학교"],
  ];

  return (
    <>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;
