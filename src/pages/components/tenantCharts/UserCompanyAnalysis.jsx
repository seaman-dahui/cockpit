import { Button, Card, Row, Col } from "antd";
import { tenantStatistics } from "@/services/cockpit";
import { useEffect, useState } from "react";
import * as echarts from "echarts";

const UserCompanyAnalysis = ({ backToHome }, ref) => {
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    getTenantStatistics();

    return () => {};
  }, []);

  useEffect(() => {
    var myChart = echarts.init(document.getElementById("chartsContainer"));
    // 绘制图表
    myChart.setOption({
      color: ["#b23a10"],
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
        { industryName: "机关单位", industryCnt: 52 },
        { industryName: "事业单位", industryCnt: 20 },
        { industryName: "国有企业", industryCnt: 86 },
        { industryName: "外资企业", industryCnt: 49 },
        { industryName: "私营企业", industryCnt: 166 },
        { industryName: "港澳台企业", industryCnt: 33 },
        { industryName: "合资资企业", industryCnt: 70 },
        { industryName: "其他", industryCnt: 11 },
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
            首页/用户单位性质
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
          用户单位性质
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
                    <div style={{ color: "#65B7FF", fontSize: 20 }}>
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
            style={{ height: "calc(100vh - 550px)" }}
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
            <div style={{ color: "#009DFF", fontSize: 24 }}>用户单位性质</div>
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
              <div style={{ flex: 1 }}>单位性质</div>
              <div style={{ width: 150 }}>人数</div>
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
                    style={{ width: 150, fontSize: 20, fontFamily: "Impact" }}
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

export default UserCompanyAnalysis;
