import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import '@sgratzl/chartjs-chart-boxplot';
import { Chart } from 'react-chartjs-2';
import { GetBarChart } from '../statistics-api/StatisticsAPI';
import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import { BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import { RegionStats } from '@/types/chart/regionStats';

// Chart.js와 BoxPlot 플러그인 등록
ChartJS.register(...registerables, BoxPlotController, BoxAndWiskers);

export function BoxChart() {
    const [loading, setLoading] = useState<boolean>(true);
    const [labels, setLabels] = useState<string[]>([]);
    const [datas, setDatas] = useState<RegionStats[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetBarChart();
                setLabels(Object.keys(res))
                setDatas(Object.values(res))

            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    const chartData = {
        labels: labels, // 지역 이름이 포함된 labels 배열
        datasets: [
            {
                label: 'Price per Area',
                data: datas.map((stats) => [
                    parseFloat(stats.min.toFixed(1)),    // min
                    parseFloat(stats.q1.toFixed(1)),     // q1
                    parseFloat(stats.median.toFixed(1)), // median
                    parseFloat(stats.q3.toFixed(1)),     // q3
                    parseFloat(stats.max.toFixed(1))     // max
                ]),
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2
            }
        ]
    };
    

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const
            },
            title: {
                display: true,
                text: '지역별 평당 가격 범위'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '지역'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '평당 가격 (단위: 만원)'
                },
                max: 4000,  // y축 최대값 설정

            }
        }
    };

    return (
<div className='contentInner' style={{ height: '400px !important', width: '100%' }}>
    <Chart type='boxplot' data={chartData} options={options} />
</div>

    );
}
