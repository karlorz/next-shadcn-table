'use client'

import { getReports, getSystems } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'
import MyHeatmap from '@/components/myheatmap'
import React from 'react'
import { EChartOption } from 'echarts'
import { columnstitles} from '@/constants/data'

export default function ListChart() {
  // const systems = getSystems()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getReports(),
    staleTime: 10 * 1000
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  // Transform the data into a heatmap-compatible format
  const transformedData = data
    ? data
        .map(item => {
          const { system, month, reports } = item
          return Object.keys(reports).map(code => ({
            system,
            month,
            code,
            value: reports[code] === -1 ? "-" : reports[code] // Replace -1 with "-"
          }))
        })
        .flat()
    : []

  // Extract the unique systems and codes for the axes of the heatmap
  const systems = Array.from(new Set(transformedData.map(item => item.system))).sort().reverse(); // Sort alphabetically
  const codes = Array.from(new Set(transformedData.map(item => item.code))).sort()

  const replacedCodes = codes.map(code => {
    const titlelabel = columnstitles.find(label => label.value === code);
    if (titlelabel) {
      return titlelabel.label;
    }
    return code;
  });

  const options: EChartOption = {
    tooltip: {
      position: 'top'
    },
    xAxis: {
      type: 'category' as const, // Specify the type as 'category'
      data: codes,
      splitArea: {
        show: true
      },
      axisLabel: {
        formatter: function (value: string) {
          const titleLabel = columnstitles.find((label) => label.value === value);
          if (titleLabel) {
            return titleLabel.label;
          }
          return value;
        }
      }
    },
    yAxis: {
      type: 'category',
      data: systems,
      splitArea: {
        show: true
      }
    },
    visualMap: [
      {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%'
      }
    ],
    series: [
      {
        type: 'heatmap',
        data: transformedData.map(item => [item.code, item.system, item.value]),
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <>
      <div>
        <h1>ChartA1</h1>
        <MyHeatmap options={options} />
      </div>
    </>
  )
}
