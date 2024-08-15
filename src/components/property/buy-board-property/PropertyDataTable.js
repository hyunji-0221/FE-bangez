"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { API } from "@/app/api/common/API";

// API 호출을 통해 데이터를 가져오는 함수
const fetchPropertyData = async () => {
  try {
    const response = await fetch(`${API.USERSERVER}/buy-article/list`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched data:", data);  // 응답 데이터 콘솔 출력
      return data;
    } else {
      console.error('Failed to fetch property data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching property data:', error);
    return [];
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case "거래 예약":
      return "pending-style style1";
    case "구하는 중":
      return "pending-style style2";
    case "거래 완료":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = () => {
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPropertyData();
      setPropertyData(data);
    };

    loadData();
  }, []);

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">제목</th>
          <th scope="col">거래 유형</th>
          <th scope="col">상태</th>
          <th scope="col">조회수</th>
          <th scope="col">등록일</th>

          {/* <th scope="col">Action</th> */}
        </tr>
      </thead>
      <tbody className="t-body">
        {propertyData.map((property) => (
          <tr key={property.id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                {/* <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={property.imageSrc}
                    alt="property"
                  />
                </div> */}
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-0">
                  <div className="h6 list-postTitle">
                    <Link href={`/buy-board-detail/${property.id}`}>{property.postTitle}</Link>
                  </div>
                  <p className="list-text mb-0">{property.location}</p>
                  <div className="list-buildType">
                    <b>{property.buildType}</b>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam" style={{ fontWeight: 'bold' }}>
              {property.tradeType}
            </td>  {/* 거래 유형 */}
            <td className="vam">
              <span className={getStatusStyle(property.status)}>
                {property.status} 
              </span>
            </td>
            <td className="vam">{property.boardHits}</td>  {/* 조회수 */}
            <td className="vam">{property.postDate}</td>  {/* 등록일 */}
            {/* <td className="vam">{property.datePublished}</td>  //등록일 
            <td className="vam">{property.datePublished}</td>  //조회수 */}
            {/* <td className="vam">
              <div className="d-flex">
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${property.id}`}
                >
                  <span className="fas fa-pen fa" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${property.id}`}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`edit-${property.id}`}
                  place="top"
                  content="Edi"
                />
                <ReactTooltip
                  id={`delete-${property.id}`}
                  place="top"
                  content="Delete"
                />
              </div>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
