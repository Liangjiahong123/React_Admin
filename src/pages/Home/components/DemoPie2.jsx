import { memo } from "react";
import Chart from "components/Chart";

const options = {
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: [20, 100],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: { borderRadius: 8 },
      data: [
        { value: 40, name: "rose 1" },
        { value: 38, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 30, name: "rose 4" },
        { value: 28, name: "rose 5" },
        { value: 26, name: "rose 6" },
        { value: 22, name: "rose 7" },
        { value: 18, name: "rose 8" }
      ]
    }
  ]
};

const DemoPie2 = () => {
  return (
    <div className="pie-2">
      <h2>饼图</h2>
      <Chart options={options} styles={{ height: "300px", width: "250px" }} />
    </div>
  );
};

export default memo(DemoPie2);
