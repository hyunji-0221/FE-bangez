import React from "react";

const PropertyFeaturesAminites = ({ data }) => { // 'data'라는 prop을 받는 컴포넌트를 정의합니다.
  
  return (
    <>
      {data && data.length > 0 ? ( // data가 존재하고 길이가 0보다 클 때만 렌더링합니다.
        data.map((item, index) => ( // 각 편의시설을 반복문(map)으로 렌더링합니다.
          <div key={index} className="col-sm-6 col-md-4"> 
            <ul className="list-style1 mb0">
              <li>
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </li>
            </ul>
          </div>
        ))
      ) : (
        <p>편의시설 정보가 없습니다.</p> // data가 없거나 길이가 0일 경우의 메시지입니다.
      )}
    </>
  );
};

export default PropertyFeaturesAminites;
