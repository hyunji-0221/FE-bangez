import { CHART_COLORS, numbers } from '@/utilis/chartjsUtils';
import {
  registerables,
  Chart,
  ChartOptions,
} from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { SalesCountByRegionForMonth } from '../statistics-api/StatisticsAPI';
import { LoadingMessage } from './chartdetail';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);



export function PieChart() {

  const [loading, setLoading] = useState(true);


  const [labels, setLabels] = useState<string[]>(["", ""])
  const [innerData, setInnerData] = useState<number[]>([1, 2])

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  const [selectYear, setSelectYear] = useState(String(year))
  const [selectMonth, setSelectMonth] = useState("06")
  const [propertyType, setPropertyType] = useState("apt_trade")
  const [region, setRegion] = useState("north")

  const data = {
    labels: labels,
    datasets: [
      {
        label: '거래 수',
        data: innerData,
        backgroundColor: Object.values(CHART_COLORS),
      }
    ]
  };

  const handleYear = (e: any) => {
    setSelectYear(e.target.value)
  }
  const handleMonth = (e: any) => {
    setSelectMonth(e.target.value)
  }
  const handlePropertyType = (e: any) => {
    setPropertyType(e.target.value)
  }
  const handleRegion = (e: any) => {
    setRegion(e.target.value)
  }

  const options: ChartOptions<'pie'>  = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '지역별 거래량',
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold' as 'bold' | 'normal' | 'lighter' | 'bolder',
        },
        formatter: (value: number) => value.toLocaleString(),
      }
    },
    // maintainAspectRatio: false,
  };

  useEffect(() => {
    const selectDate = selectYear + selectMonth;

    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await SalesCountByRegionForMonth(selectDate, propertyType, region);
        setLabels(Object.keys(result))
        setInnerData(Object.values(result))
      } catch (error) {
        console.error("statistics-board의 useEffect 실패 :", error)
      }finally {
        setLoading(false);

      }
    };
    fetchData();

  }, [selectYear, selectMonth, propertyType, region]);




  return (
    <div className='contentWrap'>
      <div className='contentInner'>
      <ul
  className='nav nav-tabs border-bottom-0 d-flex flex-wrap' // flexbox를 사용하여 자동 줄바꿈
  id='myTab'
  role='tablist'
  style={{ padding: 0, margin: 0 }} // 여백 및 패딩 제거
>
  <li className='nav-item' style={{ flex: '1 1 200px', margin: '5px' }}>
    <select
      id="regionSelect"
      className="form-select"
      onChange={handleRegion}
      style={{ width: '100%' }} // 리스트 아이템 전체를 차지하도록 스타일 추가
    >
      <option value="북부" disabled selected>
        지역
      </option>
      <option value="north"> 북부 </option>
      <option value="south"> 남부 </option>
      <option value="east"> 동부 </option>
      <option value="west"> 서부 </option>
    </select>
  </li>
  <li className='nav-item' style={{ flex: '1 1 200px', margin: '5px' }}>
    <select
      id="yearSelect"
      className="form-select"
      onChange={handlePropertyType}
      style={{ width: '100%' }} // 리스트 아이템 전체를 차지하도록 스타일 추가
    >
      <option value="apt_trade" disabled selected>
        매물종류
      </option>
      <option value="apt_trade"> 아파트 매매 </option>
      <option value="apt_rent"> 아파트 전세 </option>
      <option value="off_trade"> 오피스텔 매매 </option>
      <option value="off_rent"> 오피스텔 전세 </option>
    </select>
  </li>
  <li className='nav-item' style={{ flex: '1 1 200px', margin: '5px' }}>
    <select
      id="yearSelect"
      className="form-select"
      onChange={handleYear}
      style={{ width: '100%' }} // 리스트 아이템 전체를 차지하도록 스타일 추가
    >
      <option value={year} disabled selected>
        연도
      </option>
      <option value={year}> {year}년 </option>
      <option value={year - 1}> {year - 1}년 </option>
      <option value={year - 2}> {year - 2}년 </option>
      <option value={year - 3}> {year - 3}년 </option>
      <option value={year - 4}> {year - 4}년 </option>
    </select>
  </li>
  <li className='nav-item' style={{ flex: '1 1 200px', margin: '5px' }}>
    <select
      id="monthSelect"
      className="form-select"
      onChange={handleMonth}
      style={{ width: '100%' }} // 리스트 아이템 전체를 차지하도록 스타일 추가
    >
      <option value="06" disabled selected>
        월
      </option>
      <option value="01"> 1월 </option>
      <option value="02"> 2월 </option>
      <option value="03"> 3월 </option>
      <option value="04"> 4월 </option>
      <option value="05"> 5월 </option>
      <option value="06"> 6월 </option>
      <option value="07"> 7월 </option>
      <option value="08"> 8월 </option>
      <option value="09"> 9월 </option>
      <option value="10"> 10월 </option>
      <option value="11"> 11월 </option>
      <option value="12"> 12월 </option>
    </select>
  </li>
</ul>

        {loading ? (
          <LoadingMessage />
        ) : (
          <Pie options={options} data={data}  plugins={[ChartDataLabels as any]}/>
        )}
      </div>
    </div>
  );
}
