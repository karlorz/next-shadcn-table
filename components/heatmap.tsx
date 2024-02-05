import React, { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as echarts from 'echarts';

interface HeatmapProps {
  options: echarts.EChartsOption;
}

const Heatmap: React.FC<HeatmapProps> = ({ options }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateChart();
  }, [options]);

  const generateChart = () => {
    const chart = echarts.init(chartRef.current!);
    chart.setOption(options);
  };

  const generateReport = () => {
    const chartHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chart Report</title>
        </head>
        <body>
          <div id="chart" style="width: 100%; height: 400px;"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js"></script>
          <script>
            const chart = echarts.init(document.getElementById('chart'));
            chart.setOption(${JSON.stringify(options)});
          </script>
        </body>
      </html>
    `;

    return chartHtml;
  };

  const handleDownload = () => {
    const chartHtml = generateReport();
    const blob = new Blob([chartHtml], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'chart_report.html');
  };

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      {/* <button onClick={handleDownload}>Download Report</button> */}
    </div>
  );
};

export default Heatmap;