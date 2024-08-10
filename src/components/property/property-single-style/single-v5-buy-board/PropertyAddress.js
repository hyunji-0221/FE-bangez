import ListingMap1 from "@/components/listing/map-style/ListingMap1";
import React from "react";

const PropertyAddress = ({ data }) => {
  const address = {
    address: data.location || "주소 정보 없음"
  };

  return (
    <>
      <div className="col-md-6 col-xl-9">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }}>
            <p className="fw600 mb0 ff-heading dark-color">상세주소</p>
          </div>
          <div style={{ flex: 1 }}>
            <p className="text mb0">{address.address}</p>
          </div>
        </div>
      </div>
      {/* End col */}

      
    </>
  );
};

export default PropertyAddress;
