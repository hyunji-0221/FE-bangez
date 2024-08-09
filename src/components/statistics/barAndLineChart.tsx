'use client'
import { avgCost } from "@/components/statistics-api/StatisticsAPI";
import { useEffect, useState } from "react";
import { CHART_COLORS, transparentize } from '@/utilis/chartjsUtils';
import {
  registerables,
  Chart,
} from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { LoadingMessage } from "./chartdetail";
import EventEmitter from "events";
Chart.register(...registerables);
let aptTrade: number[];
let aptAxis: number[];
const eventEmitter = new EventEmitter();
export function BarChart() {
  const tradeType = ["apt_trade", "apt_rent", "off_trade", "off_rent"]
  const [tradeLabels, setTradeLabels] = useState(["아파트 매매", "아파트 전세"])
  const [aptTradeData, setAptTradeData] = useState<number[]>([])
  const [offTradeData, setOffTradeData] = useState<number[]>([])
  const [aptRentData, setAptRentData] = useState<number[]>([])
  const [offRentData, setOffRentData] = useState<number[]>([])
  const [aptAxisName, setAptAxisName] = useState<number[]>([])
  const [offAxisName, setOffAxisName] = useState<number[]>([2024, 2023])
  const [selectDataTrade, setSelectDataTrade] = useState([1, 2])
  const [selectDataRent, setSelectDataRent] = useState([1, 2])
  const [selectAxis, setSelectAxis] = useState([2024, 2023])
  const [loading, setLoading] = useState(true);
  const handleApt = (e: any) => {
    setSelectDataTrade(aptTradeData)
    setSelectDataRent(aptRentData)
    setSelectAxis(aptAxisName)
    setTradeLabels(["아파트 매매", "아파트 전세"])
  }
  const handleOfficetel = (e: any) => {
    setSelectDataTrade(offTradeData)
    setSelectDataRent(offRentData)
    setSelectAxis(offAxisName)
    setTradeLabels(["오피스텔 매매", "오피스텔 전세"])
  }
  const data = {
    labels: selectAxis,
    datasets: [
      {
        label: tradeLabels[0],
        data: selectDataTrade,
        borderColor: CHART_COLORS.grey,
        backgroundColor: transparentize(CHART_COLORS.red, 0.1),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false
      },
      {
        label: tradeLabels[1],
        data: selectDataRent,
        borderColor: CHART_COLORS.grey,
        backgroundColor: transparentize(CHART_COLORS.purple, 0.1), //마우스 호버시 나타나는 분류네모 표시 bg
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '서울시 월별 매매 평균가격',
      },
    },
    scales: {
      x: {
          title: {
              display: true,
              text: '날짜(년+월)'
          }
      },
      y: {
          title: {
              display: true,
              text: '가격 (단위: 만원)'
          },
      }
  }
    // maintainAspectRatio: false,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const aptTradeResult = await avgCost(tradeType[0]);
      const aptRentResult = await avgCost(tradeType[1]);
      const offTradeResult = await avgCost(tradeType[2]);
      const offRentResult = await avgCost(tradeType[3]);
      aptAxis = (Object.keys(aptTradeResult).map(i => parseInt(i)));
      setOffAxisName(Object.keys(offTradeResult).map(i => parseInt(i)));
      setAptAxisName(Object.keys(aptTradeResult).map(i => parseInt(i)))
      aptTrade = (Object.values(aptTradeResult));
      setAptTradeData(Object.values(aptTradeResult))
      setOffTradeData(Object.values(offTradeResult));
      setAptRentData(Object.values(aptRentResult));
      setOffRentData(Object.values(offRentResult));
      setSelectDataTrade(Object.values(aptTradeResult));
      setSelectDataRent(Object.values(aptRentResult));
      setSelectAxis(Object.keys(aptTradeResult).map(i => parseInt(i)));
    } catch (error) {
      console.error("statistics-board의 useEffect 실패 :", error)
    } finally {
      setLoading(false);
      eventEmitter.emit('lineChart')
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='contentWrap'>
      <div className='contentInner'>
        <ul
          className='nav nav-tabs border-bottom-0'
          id='myTab'
          role='tablist'
        >
          <li className='nav-item'>
            <a
              className='nav-link active'
              id='apt'
              data-bs-toggle='tab'
              href='#apt'
              role='tab'
              aria-controls='apt'
              aria-selected='true'
              onClick={handleApt}
            >
              아파트
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link'
              id='officetel'
              data-bs-toggle='tab'
              href='#officetel'
              role='tab'
              aria-controls='officetel'
              aria-selected='false'
              onClick={handleOfficetel}
            >
              오피스텔
            </a>
          </li>
        </ul>
        {loading ? (
          <LoadingMessage />
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
}
export function LineChart() {
  const [costIndex, setCostIndex] = useState<number[]>([]);
  const [axis, setAxis] = useState<number[]>([])
  const data = {
    labels: axis,
    datasets: [
      {
        label: '',
        data: costIndex,
        borderColor: function(context: { chart: any; }) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: '서울시 아파트 가격지수 변화율 (기준 가격 : '+ axis[0]+' 가격)',
      },
    },
    scales: {
      x: {
          title: {
              display: true,
              text: '날짜 (년+월)'
          }
      },
      y: {
          title: {
              display: true,
              text: '가격 지수 변동 (%)'
          },
      }
  }
  };
  eventEmitter.on('lineChart', () =>{
        if (aptTrade.length > 0 && aptAxis.length > 0) {
          const newCostIndex = [0];
          for (let i = 1; i < aptTrade.length-1; i++) {
            newCostIndex[i] = (aptTrade[i] - (aptTrade[0])) / (aptTrade[0])*100;
          }
          setCostIndex(newCostIndex);
          setAxis(aptAxis.slice(0, aptTrade.length-1));
        }}
  )
  return (
    <div className='contentWrap'>
      <div className='contentInner' style={{ height: '100%', width: '100%' }}>
          <Line options={options} data={data} />
              </div>
    </div>
  );
}
let width: number, height: number, gradient: { addColorStop: (arg0: number, arg1: any) => void; };
function getGradient(ctx: { createLinearGradient: (arg0: number, arg1: any, arg2: number, arg3: any) => { addColorStop: (arg0: number, arg1: any) => void; }; }, chartArea: { right: number; left: number; bottom: number; top: number; }) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, CHART_COLORS.blue);
    gradient.addColorStop(0.5, CHART_COLORS.yellow);
    gradient.addColorStop(1, CHART_COLORS.red);
  }
  return gradient;
}