import React from "react";
import { Property } from "@/module/property/Property"; // Assuming this is the correct path

interface PropertyFeaturesAminitesProps {
  property: Property;
}

// 배열 내부의 문자열을 정리하는 함수
const cleanTagList = (tagList: string[]): string[] => {
  return tagList.map(tag => tag.replace(/[\[\]']+/g, '').trim());
};

const PropertyFeaturesAminites: React.FC<PropertyFeaturesAminitesProps> = ({ property }) => {
  // tagList 배열의 각 항목을 정리하여 새로운 배열 생성
  const featuresAmenitiesData = cleanTagList(property.tagList || []);

  return (
    <div className="row">
      {featuresAmenitiesData.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4">
          <div className="pd-list">
            <p className="text mb10">
              <i className="fas fa-circle fz6 align-middle pe-2" />
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyFeaturesAminites;