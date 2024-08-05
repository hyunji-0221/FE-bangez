import {
  registerables,
  Chart,
} from 'chart.js/auto';
import { useState } from 'react';
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from 'react-chartjs-2';

Chart.register(...registerables);


export const LoadingMessage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
    <p>로딩 중...</p>
  </div>
);

export function LineChart(options:any, data:any) {

    return (
      <div className='contentWrap'>
        <div className='contentInner'>
          <Line options={options} data={data} />
        </div>
      </div>
    );
  }

  export function DoughnutChart(options:any, data:any) {

    return (
      <div className='contentWrap'>
        <div className='contentInner'>
          <Doughnut options={options} data={data} />
        </div>
      </div>
    );
  }

  export function PolarAreaChart(options:any, data:any) {

    return (
      <div className='contentWrap'>
        <div className='contentInner'>
          <PolarArea options={options} data={data} />
        </div>
      </div>
    );
  }

  export function BubbleChart(options:any, data:any) {

    return (
      <div className='contentWrap'>
        <div className='contentInner'>
          <Bubble options={options} data={data} />
        </div>
      </div>
    );
  }

  export function PieChart(options:any, data:any) {

    return (
      <div className='contentWrap'>
        <div className='contentInner'>
          <Pie options={options} data={data} />
        </div>
      </div>
    );
  }



