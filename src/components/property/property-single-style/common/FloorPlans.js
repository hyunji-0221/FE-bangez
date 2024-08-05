import React from "react";
import Image from "next/image";


const FloorPlans = () => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-body text-center">
              <Image
                width={736}
                height={544}
                className="w-100 h-100 cover"
                
                alt="listing figureout"
              />
            </div>
    </div>
  );
};

export default FloorPlans;
