'use client'

import { getReports, getSystems } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'
import MyHeatmap from '@/components/myheatmap'
import React from 'react'
import { EChartOption } from 'echarts'
import { columnstitles } from '@/constants/data'
import ruleTablefdda2 from '@/constants/ruleTable_fdda2.json'

import reports from '@/constants/fdda2_report.json'

interface RuleTable {
  [key: string]: {
    [key: string]: number;
  };
}

const ruleTableData: RuleTable = ruleTablefdda2 as RuleTable;

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

  // Get the list of x axe from the reports data
  const xaxeKeys = reports.reports

  const transformedData: any[] = data
  ? data
      .map((item: any) => {
        const { system, month, reports } = item;
        return Object.keys(reports).map((code: string) => {
          const ruleValue = (ruleTableData[system] || {})[code];
          const value = reports[code] === -1 ? '-' : reports[code];
          const health = ruleValue === 1 && value === '-' ? 1 : 0; // Check data health based on rule table
          return {
            system,
            month,
            code,
            value,
            health,
          };
        });
      })
      .flat()
  : [];

  // Extract the unique systems and codes for the axes of the heatmap
  const systems = Array.from(new Set(transformedData.map(item => item.system)))
    .sort()
    .reverse() // Sort alphabetically
  const codes = Array.from(
    new Set(transformedData.map(item => item.code))
  ).sort()

  const formatTooltip = (params: any) => {
    const { value, seriesName } = params
    const xlabel = columnstitles.find(label => label.value === params.value[0])
    // const titleLabel = columnstitles.find((label) => label.value === seriesName);
    const xLabelout = xlabel ? xlabel.label : value[0]
    const yLabelout = value[1]
    const seriesValue = value[2]
    return `${xLabelout},${yLabelout}: ${seriesValue}`
  }

  const debugseriesValue = transformedData.map(item => [
    item.code,
    item.system,
    item.value
  ])
  // console.log(debugseriesValue)
  const options: EChartOption = {
    tooltip: {
      position: 'top',
      formatter: formatTooltip // Use the formatTooltip function to format the tooltip
    },
    xAxis: {
      type: 'category' as const, // Specify the type as 'category'
      data: xaxeKeys.filter(key => codes.includes(key)), // Filter the x-axis data based on codes array,
      splitArea: {
        show: true
      },
      axisLabel: {
        formatter: function (value: string) {
          const titleLabel = columnstitles.find(label => label.value === value)
          if (titleLabel) {
            return titleLabel.label
          }
          return value
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
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%'
      }
    ],
    series: [
      {
        type: 'heatmap',
        data: transformedData.map(item => [
          item.code,
          item.system,
          // item.value,
          item.health
        ]), // Include health property in the data
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
        <h1>FDDA1 data health</h1>
        <MyHeatmap options={options} />
      </div>
    </>
  )
}
