import * as echarts from "echarts";
import { useEffect } from "react";

import { tenantStatistics } from "@/services/cockpit";

const TenantIndustry = ({ info }) => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("chartsContainer"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "3%",
        left: "center",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#98E7FF",
        },
      },
      series: [
        {
          name: "租客画像分析",
          type: "pie",
          percentPrecision: 0,
          radius: ["40%", "70%"],
          percentPrecision: 0,
          height: "80%",
          label: {
            color: "inherit",
            formatter: "{b}: {d}%",
          },
          emphasis: {
            label: {
              fontSize: 17,
            },
          },
          data:
            info?.map((v) => ({
              value: v.industryCnt,
              name: v.industryName,
            })) || [],
        },
      ],
    });

    window.addEventListener("resize", function () {
      myChart.resize();
    });

    return () => {
      window.removeEventListener("resize", function () {
        myChart.resize();
      });
    };
  }, [info]);

  return (
    <div style={{ height: "calc(100vh - 610px)" }} id="chartsContainer"></div>
  );
};

export default TenantIndustry;
