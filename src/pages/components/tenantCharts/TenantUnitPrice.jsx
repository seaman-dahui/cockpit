import { Button, Card, Row, Col } from "antd";
import { tenantStatistics } from "@/services/cockpit";
import { useEffect, useState } from "react";
import * as echarts from "echarts";

const TenantUnitPrice = ({ backToHome }, ref) => {
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    getTenantStatistics();
    return () => {};
  }, []);

  useEffect(() => {
    var myChart = echarts.init(document.getElementById("chartsContainer"));
    // 绘制图表
    myChart.setOption({
      color: ["#9d39a0"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",

        axisLine: {
          lineStyle: {
            color: "#24DCF0",
          },
        },
        axisLabel: {
          interval: 0,
        },

        data: industryList?.map((v) => v.industryName),
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#24DCF0",
          },
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#0D556A",
          },
        },
        boundaryGap: [0, 0.01],
      },
      series: [
        {
          name: "用户单位性质分析",
          type: "bar",
          data: industryList?.map((v) => v.industryCnt),
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
  }, [industryList]);

  const getTenantStatistics = () => {
    // tenantStatistics({}).then((res) => {
    // if (res?.code === 0) {
    setIndustryList(
      [
        { industryName: "公安大楼", industryCnt: 5145 },
        { industryName: "假日酒店", industryCnt: 5150 },
        { industryName: "宜浩佳园內商", industryCnt: 4200 },
        { industryName: "陆家嘴广场", industryCnt: 3300 },
        { industryName: "水务大厦", industryCnt: 2612 },
        { industryName: "宜浩欧景小镇", industryCnt: 500 },
        { industryName: "宜浩晶萃（南侧）", industryCnt: 2612 },
      ] || []
    );
    // }
    // });
  };

  return (
    <>
      <div
        style={{
          flex: 1.8,
          display: "flex",
          flexDirection: "column",
          padding: "0 10px",
        }}
      >
        {/* 中间 */}

        <div
          style={{
            display: "flex",
            padding: "10px 24px",
            background: "#022952",
            marginBottom: 10,
          }}
        >
          <div style={{ flex: 1, color: "#DDFFFE", fontSize: 18 }}>
            首页/租客均价分析
          </div>
          <Button
            style={{
              boxShadow: "inset 0px 1px 13px 0px #1084ff",
              background: "#03225F",
              border: "none",
              color: "#01C5FF",
            }}
            onClick={() => backToHome("home")}
          >
            返回
          </Button>
        </div>
        <div
          style={{
            padding: "16px 24px",
            textAlign: "center",
            color: "#009DFF",
            fontSize: 24,
            background: "#022952",
          }}
        >
          租客均价分析
        </div>
        <div
          style={{
            flex: 1,
            padding: "10px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row gutter={[20, 10]}>
            {industryList.length > 0 &&
              industryList.map((v) => (
                <Col span={8}>
                  <div
                    key={v.industryId}
                    style={{
                      padding: 10,
                      border: "1px solid #4388FF",
                      borderLeftWidth: 6,
                      background: "#022952",
                      cursor: "pointer",
                    }}
                    //   onClick={() => viewTenant(v.industryId)}
                  >
                    <div
                      style={{
                        color: "#65B7FF",
                        fontSize: 20,
                        overflow: "hidden",
                        whiteSpace: " nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {v.industryName || ""}
                    </div>
                    <div
                      style={{ width: "50%", borderTop: "1px solid #65B7FF" }}
                    ></div>
                    <div
                      style={{
                        color: "#0BC5FB",
                        fontSize: 20,
                        fontFamily: "Impact",
                      }}
                    >
                      {v.industryCnt || 0}
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
          <div
            style={{ height: "calc(100vh - 600px)" }}
            id="chartsContainer"
          ></div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {/* 右侧 */}
        <Card
          bordered={false}
          style={{
            background: "#000",
            boxShadow: "inset 0px 1px 13px 0px #1084ff",
            marginBottom: 10,
          }}
          title={
            <div style={{ color: "#009DFF", fontSize: 24 }}>租客均价分析</div>
          }
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 24px",
                boxShadow: "inset 0px 1px 13px 0px #1084ff",
                color: "#98E7FF",
                fontSize: 16,
              }}
            >
              <div style={{ flex: 1 }}>项目名称</div>
              <div style={{ width: 100 }}>租金均价</div>
            </div>

            <div
              style={{
                height: "calc(100vh - 271px)",
                overflow: "auto",
                scrollbarWidth: "none",
                boxShadow: "inset 0px 1px 13px 0px #1084ff",
                padding: "0 3px",
              }}
            >
              {industryList.map((v, i) => (
                <div
                  key={v.name}
                  style={{
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                    height: 65,
                    color: "#0BC5FB",
                    fontSize: 16,
                    background: i % 2 == 1 ? "#08203D" : "#000307",
                  }}
                >
                  <div style={{ flex: 1 }}>{v.industryName}</div>

                  <div
                    style={{ width: 100, fontSize: 20, fontFamily: "Impact" }}
                  >
                    {v.industryCnt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TenantUnitPrice;
