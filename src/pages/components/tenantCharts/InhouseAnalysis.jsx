import { Button, Card, Row, Col } from "antd";
import { tenantLive } from "@/services/cockpit";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
const colorList = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];
const InhouseAnalysis = ({ backToHome }, ref) => {
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    // getTenantStatistics();
    return () => {};
  }, []);

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("chartsContainer"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },

      series: [
        {
          name: "入住情况分析",
          type: "pie",
          percentPrecision: 0,
          radius: ["40%", "70%"],
          //   height: '80%',
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
            industryList?.map((v) => ({ value: v.liveCnt, name: v.year })) ||
            [],
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
    tenantLive({}).then((res) => {
      if (res?.code === 0) {
        setIndustryList(res?.data || []);
      }
    });
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
            首页/入住情况分析
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
          入住情况分析
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
              industryList.map((v, i) => (
                <Col span={8}>
                  <div
                    key={v.industryId}
                    style={{
                      padding: 10,
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #4388FF",
                      borderLeftWidth: 6,
                      background: "#022952",
                      cursor: "pointer",
                    }}
                    //   onClick={() => viewTenant(v.industryId)}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        marginRight: 13,
                        background: colorList[i % 9],
                      }}
                    ></div>
                    <div style={{ flex: 1, color: "#fff", fontSize: 16 }}>
                      {v.year || ""}
                    </div>
                    <div style={{ flex: 0.5, color: "#65B7FF", fontSize: 20 }}>
                      {(v.liveRate * 100).toFixed(0) || 0}%
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
          <div
            style={{ height: "calc(100vh - 430px)" }}
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
            <div style={{ color: "#009DFF", fontSize: 24 }}>入住情况分析</div>
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
              <div style={{ flex: 1 }}>年份</div>
              <div style={{ width: 150 }}>租客数</div>
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
                  key={v.year}
                  style={{
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                    height: 65,
                    color: "#0BC5FB",
                    fontSize: 16,
                    borderTop: "none",
                    background: i % 2 == 1 ? "#08203D" : "#000307",
                  }}
                >
                  <div style={{ flex: 1 }}>{v.year}</div>

                  <div
                    style={{ width: 150, fontSize: 20, fontFamily: "Impact" }}
                  >
                    {v.liveCnt}
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

export default InhouseAnalysis;
