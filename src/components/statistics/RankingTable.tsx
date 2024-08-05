import React, { useEffect, useState } from "react";
import { tradeCountRaiseTop5ForMonth } from "@/components/statistics-api/StatisticsAPI";

export const PropertyDataTable = () => {

  const [aptName, setAptName] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  const propertyData = [
    {
      id: 1,
      aptName: aptName[0],
      status: "1등",
      tradeCount: count[0]
    },
    {
      id: 2,
      aptName: aptName[1],
      status: "2등",
      tradeCount: count[1]
    },
    {
      id: 3,
      aptName: aptName[2],
      status: "3등",
      tradeCount: count[2]
    },
    {
      id: 4,
      aptName: aptName[3],
      status: "4등",
      tradeCount: count[3]
    },
    {
      id: 5,
      aptName: aptName[4],
      status: "5등",
      tradeCount: count[4]
    },
  ];

  const getStatusStyle = (status: any) => {
    switch (status) {
      case "1등":
        return "pending-style style1";
      case "2등":
        return "pending-style style2";
      case "3등":
        return "pending-style style3";
      default:
        return "pending-style style4";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tradeCountRaiseTop5ForMonth();
        setAptName(Object.keys(result))
        setCount(Object.values(result))
      } catch (error) {
        console.error("PropertyDataTable의 useEffect 실패 :", error)
      }
    };
    fetchData();
  }, [])

  return (
    <table className="table-style4 table at-savesearch" style={{ height: "100%", width: "100%" }}>
      <thead className="t-head">
        <tr>
          <th scope="col">순위</th>
          <th scope="col">아파트</th>
          <th scope="col">거래량</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {propertyData.map((property) => (
          <tr key={property.id}>
            <td className="vam">
              <span className={getStatusStyle(property.status)}>
                {property.status}
              </span>
            </td>
            <td className="vam">{property.aptName}</td>
            <td className="vam">{property.tradeCount}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
