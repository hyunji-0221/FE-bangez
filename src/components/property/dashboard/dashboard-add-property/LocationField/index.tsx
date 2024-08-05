// import React, { useState, useEffect } from "react";

// declare global {
//   interface Window {
//     daum: any; // 다음 API를 전역에서 사용할 수 있게 선언
//   }
// }

// interface LocationFieldProps {
//   updateLocation: (data: { lat: string; lng: string; roadAddress: string; address: string, town: string }) => void;
// }

// const LocationField: React.FC<LocationFieldProps> = ({ updateLocation }) => {
//   const [postcode, setPostcode] = useState("");
//   const [roadAddress, setRoadAddress] = useState("");
//   const [jibunAddress, setJibunAddress] = useState("");
//   const [extraAddress, setExtraAddress] = useState("");
//   const [detailAddress, setDetailAddress] = useState("");
//   const [town, setTown] = useState(""); // town state 추가

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleAddressSearch = () => {
//     if (window.daum && window.daum.Postcode) {
//       new window.daum.Postcode({
//         oncomplete: function (data) {
//           setPostcode(data.zonecode);
//           setRoadAddress(data.roadAddress);
//           setJibunAddress(data.jibunAddress);

//           let extraAddr = "";
//           if (data.bname && /[동|로|가]$/g.test(data.bname)) {
//             extraAddr += data.bname;
//           }
//           if (data.buildingName && data.apartment === "Y") {
//             extraAddr += extraAddr ? ", " + data.buildingName : data.buildingName;
//           }
//           setExtraAddress(extraAddr ? `(${extraAddr})` : "");

//           const extractedTown = `${data.sigungu} ${data.bname}`; // 구와 동 추출
//           setTown(extractedTown); // town 정보 설정

//           updateLocation({
//             lat: data.zonecode, // 여기에 실제 위도 경도를 사용해야 함. zonecode는 예시입니다.
//             lng: data.zonecode, // 여기에 실제 위도 경도를 사용해야 함. zonecode는 예시입니다.
//             roadAddress: data.roadAddress,
//             address: data.jibunAddress,
//             town: extractedTown,
//           });
//         },
//       }).open();
//     } else {
//       console.error("Daum Postcode script is not loaded yet.");
//     }
//   };

//   return (
//     <form className="form-style1">
//       <div className="row">
//         <div className="col-sm-12">
//           <div className="mb20">
//             <label className="heading-color ff-heading fw600 mb10">우편번호</label>
//             <div className="input-group">
//               <input type="text" className="form-control" value={postcode} readOnly />
//               <button type="button" className="btn btn-secondary" onClick={handleAddressSearch}>
//                 우편번호 찾기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-sm-12">
//           <div className="mb20">
//             <label className="heading-color ff-heading fw600 mb10">도로명주소</label>
//             <input type="text" className="form-control" value={roadAddress} readOnly />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-sm-12">
//           <div className="mb20">
//             <label className="heading-color ff-heading fw600 mb10">지번주소</label>
//             <input type="text" className="form-control" value={jibunAddress} readOnly />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-sm-12">
//           <div className="mb20">
//             <label className="heading-color ff-heading fw600 mb10">상세주소</label>
//             <input
//               type="text"
//               className="form-control"
//               value={detailAddress}
//               onChange={(e) => setDetailAddress(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-sm-12">
//           <div className="mb20">
//             <label className="heading-color ff-heading fw600 mb10">구/동</label>
//             <input type="text" className="form-control" value={town} readOnly />
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default LocationField;

import React, { useState, useEffect } from "react";

interface LocationFieldProps {
  updateLocation: (data: { lat: string; lng: string; roadAddress: string; address: string; town: string }) => void;
}

const LocationField: React.FC<LocationFieldProps> = ({ updateLocation }) => {
  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [town, setTown] = useState("");

  const fetchCoordinates = async (query: string) => {
    try {
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_GEO_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        if (data.documents.length > 0) {
          const firstResult = data.documents[0];
          const { address, road_address, x, y } = firstResult;

          setRoadAddress(road_address ? road_address.address_name : "");
          setJibunAddress(address.address_name);

          const extractedTown = `${address.region_2depth_name} ${address.region_3depth_name}`;
          setTown(extractedTown);

          updateLocation({
            lat: y,
            lng: x,
            roadAddress: road_address ? road_address.address_name : "",
            address: address.address_name,
            town: extractedTown,
          });
        }
      } else {
        console.error("Failed to fetch data from API");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setPostcode(data.zonecode);
          setRoadAddress(data.roadAddress);
          setJibunAddress(data.jibunAddress);

          let extraAddr = "";
          if (data.bname && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName && data.apartment === "Y") {
            extraAddr += extraAddr ? ", " + data.buildingName : data.buildingName;
          }
          setExtraAddress(extraAddr ? `(${extraAddr})` : "");

          const extractedTown = `${data.sigungu} ${data.bname}`; // 구와 동 추출
          setTown(extractedTown); // town 정보 설정

          // REST API 호출로 좌표 얻기
          fetchCoordinates(data.roadAddress || data.jibunAddress);
        },
      }).open();
    } else {
      console.error("Daum Postcode script is not loaded yet.");
    }
  };

  useEffect(() => {
    const postcodeScript = document.createElement("script");
    postcodeScript.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    postcodeScript.async = true;
    document.body.appendChild(postcodeScript);

    return () => {
      document.body.removeChild(postcodeScript);
    };
  }, []);

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">우편번호</label>
            <div className="input-group">
              <input type="text" className="form-control" value={postcode} readOnly />
              <button type="button" className="btn btn-secondary" onClick={handleAddressSearch}>
                우편번호 찾기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">도로명주소</label>
            <input type="text" className="form-control" value={roadAddress} readOnly />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">지번주소</label>
            <input type="text" className="form-control" value={jibunAddress} readOnly />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">상세주소</label>
            <input
              type="text"
              className="form-control"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">구/동</label>
            <input type="text" className="form-control" value={town} readOnly />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationField;