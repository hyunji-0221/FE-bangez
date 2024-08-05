import React from "react";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface PropertyDescriptionsProps {
  property: Property;
}

const ProperytyDescriptions: React.FC<PropertyDescriptionsProps> = ({ property }) => {
  return (
    <>
      <p className="text mb10">
        {property.atclFetrDesc}
      </p>
      
    </>
  );
};

export default ProperytyDescriptions;