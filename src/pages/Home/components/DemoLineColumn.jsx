import { memo } from "react";
import Chart from "components/Chart";

const options = {
  legend: {},
  xAxis: {
    type: "category",
    data: Array.from({ length: 7 }, (_, i) => `街道${i + 1}`)
  },
  yAxis: [
    { type: "value" },
    {
      type: "value",
      name: "%",
      nameTextStyle: { color: "#ccc", padding: [0, 0, 10, -30] },
      splitNumber: 5,
      splitLine: { show: true, lineStyle: { type: "dashed", width: 1, color: ["#ccc", "#ccc"] } },
      axisLabel: { show: true, axisLabel: { fontSize: 12 } }
    }
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    textStyle: { fontSize: 14, color: "#fff", align: "left" },
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  series: [
    { name: "3-11岁任务数", data: [150, 230, 224, 218, 135, 147, 260], type: "bar" },
    { name: "3-11岁全程接种量", data: [150, 230, 224, 218, 135, 147, 260], type: "bar" },
    { name: "60岁任务数", data: [150, 230, 224, 218, 135, 147, 260], type: "bar" },
    { name: "60岁全程接种量", data: [880, 30, 124, 118, 35, 47, 160], type: "bar" },
    { name: "80岁任务数", data: [880, 30, 124, 118, 35, 47, 160], type: "bar" },
    { name: "80岁全程接种量", data: [880, 30, 124, 118, 35, 47, 160], type: "bar" },
    {
      name: "完成率",
      data: [50, 130, 124, 18, 35, 47, 160],
      type: "line",
      smooth: true,
      yAxisIndex: 1
    }
  ]
};

const DemoColumn = () => {
  return (
    <div className="line-column">
      <h2>折线+柱状图</h2>
      <Chart options={options} styles={{ height: "400px" }} />
    </div>
  );
};

export default memo(DemoColumn);
