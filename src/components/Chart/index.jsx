import { useEffect, useRef } from "react";
import * as echart from "echarts";

const Chart = ({ options, styles, mapData }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    renderChart();
    return () => {
      chartInstance?.dispose();
    };
  });

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

  function renderChart() {
    const renderInstance = echart.getInstanceByDom(chartRef.current);
    chartInstance = renderInstance || echart.init(chartRef.current);
    if (mapData) echart.registerMap("HK", mapData);
    chartInstance.setOption(options);

    try {
    } catch (error) {
      console.error(error);
      chartInstance?.dispose();
    }
  }

  function resizeHandler() {
    chartInstance?.resize();
  }

  return <div style={styles} ref={chartRef}></div>;
};

export default Chart;
