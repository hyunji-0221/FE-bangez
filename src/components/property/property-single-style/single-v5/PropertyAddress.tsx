import React from "react";
import ListingMap1 from "@/components/listing/map-style/Map";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface PropertyAddressProps {
  property: Property;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({ property }) => {
  const addresses = [
    {
      address: property.roadAddress,
      city: property.address,
      state: property.town,
    },
  ];

  return (
    <>
      {addresses.map((address, index) => (
        <div key={index} className="col-md-6 col-xl-6">
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">도로명 주소</p>
              <p className="fw600 mb10 ff-heading dark-color">지번 주소</p>
              <p className="fw600 mb-0 ff-heading dark-color">시/군/구</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{address.city}</p> 
              <p className="text mb10">{address.city}</p>
              <p className="text mb-0">{address.state}</p>
            </div>
          </div>
        </div>
      ))}
      {/* End col */}

      <div className="col-md-12 h-500" style={{ height: '400px' }}>
        <ListingMap1 properties={[property]} />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;