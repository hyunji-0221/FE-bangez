import React, { useEffect, useState } from "react";
import { getUserCount } from "../statistics-api/StatisticsAPI";
import { CounterWithAnimation } from "./Funfact";

const TopStateBlock = () => {

  const [count, setCount] = useState()

  
const statisticsData = [
  {
    text: "All Properties",
    title: "583",
    icon: "flaticon-home",
  },
  {
    text: "Total Views",
    title: "192",
    icon: "flaticon-search-chart",
  },
  {
    text: "Total Visitor",
    title: "438",
    icon: "flaticon-review",
  },
  {
    text: "오늘 접속자 수",
    title: count,
    icon: "flaticon-like",
  },
];

  useEffect(() => {
    const fetchCount = async () => {
      try {
          const data = await getUserCount()
          console.log("fetchcount안의 data", data.count)
          setCount(data.count);
      } catch (error) {
          console.error('Error fetching access count:', error);
      }
  };
  
  fetchCount();
  const intervalId = setInterval(fetchCount, 60000); // 60초마다 업데이트
  
  return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      {statisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">
              <CounterWithAnimation end={data.title} />

               </div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopStateBlock;
