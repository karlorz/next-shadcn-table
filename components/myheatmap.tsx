"use client"

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import theme from "@/constants/shine.json";

const mytheme = "shine";

interface MyHeatmapProps {
  options: echarts.EChartOption;
}

function MyHeatmap({ options }: MyHeatmapProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  let chartInstance: echarts.ECharts | null = null;

  function renderChart() {
    try {
      const renderedInstance = echarts.getInstanceByDom(chartRef.current!);

      if (renderedInstance) {
        chartInstance = renderedInstance;
      } else {
        echarts.registerTheme(mytheme, theme);
        chartInstance = echarts.init(chartRef.current!, mytheme);
      }

      chartInstance.setOption(options);
    } catch (error) {
      console.error("error", (error as Error).message);

      chartInstance && chartInstance.dispose();
    }
  }

  function resizeHandler() {
    chartInstance!.resize();
  }

  useEffect(() => {
    renderChart();

    return () => {
      chartInstance && chartInstance.dispose();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div>
      <div style={{ height: "600px" }} ref={chartRef} />
    </div>
  );
}

export default MyHeatmap;