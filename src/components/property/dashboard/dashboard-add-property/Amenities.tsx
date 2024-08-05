// import React from "react";

// const amenitiesData = [
//   "침대", "책상", "옷장", "식탁", "쇼파", "신발장", "냉장고", "세탁기", "건조기", 
//   "샤워부스", "욕조", "비데", "싱크대", "식기세척기", "가스레인지", "인덕션", 
//   "전자레인지", "가스오븐", "TV", "경비원", "비디오폰", "인터폰", "카드키", "CCTV", 
//   "사설경비", "현관보안", "방범창", "화재경보기", "베란다", "테라스", "마당", "무인택배함"
// ];

// const Amenities = () => {
//   return (
//     <div className="row">
//       {amenitiesData.map((amenity, index) => (
//         <div key={index} className="col-sm-6 col-lg-4">
//           <label className="custom_checkbox">
//             {amenity}
//             <input type="checkbox" defaultChecked={false} />
//             <span className="checkmark" />
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Amenities;


import React, { useState, useEffect } from "react";

const amenitiesData = [
  "침대", "책상", "옷장", "식탁", "쇼파", "신발장", "냉장고", "세탁기", "건조기", 
  "샤워부스", "욕조", "비데", "싱크대", "식기세척기", "가스레인지", "인덕션", 
  "전자레인지", "가스오븐", "TV", "경비원", "비디오폰", "인터폰", "카드키", "CCTV", 
  "사설경비", "현관보안", "방범창", "화재경보기", "베란다", "테라스", "마당", "무인택배함"
];

interface AmenitiesProps {
  updateAmenities: (data: { tagList: string[] }) => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ updateAmenities }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((item) => item !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  useEffect(() => {
    updateAmenities({ tagList: selectedAmenities });
  }, [selectedAmenities]);

  return (
    <div className="row">
      {amenitiesData.map((amenity, index) => (
        <div key={index} className="col-sm-6 col-lg-4">
          <label className="custom_checkbox">
            {amenity}
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
            />
            <span className="checkmark" />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Amenities;