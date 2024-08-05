import React from "react";
import Map11 from "@/components/listing/map-style/Map";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface MapProps {
  property: Property;
}

const Map: React.FC<MapProps> = ({ property }) => {
  return (
    <div style={{ height: '600px' }}>
      <Map11 properties={[property]} />
    </div>
  );
};

export default Map;