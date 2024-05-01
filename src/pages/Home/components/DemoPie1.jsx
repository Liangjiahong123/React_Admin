import { memo } from "react";
import Chart from "components/Chart";

const options = {
  tooltip: {
    trigger: "item"
  },
  legend: null,
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: { show: false, position: "center" },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: "bold" }
      },
      labelLine: { show: false },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" }
      ]
    }
  ]
};

const DemoPie1 = () => {
  return (
    <div className="pie-1">
      <h2>饼图</h2>
      <Chart options={options} styles={{ height: "300px", width: "250px" }} />
    </div>
  );
};

export default memo(DemoPie1);
