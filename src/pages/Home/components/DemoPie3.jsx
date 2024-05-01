import { memo } from "react";
import Chart from "components/Chart";

const options = {
  tooltip: { trigger: "item" },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};

const DemoPie3 = () => {
  return (
    <div className="pie-3">
      <h2>饼图</h2>
      <Chart options={options} styles={{ height: "300px", width: "250px" }} />
    </div>
  );
};

export default memo(DemoPie3);
