import { Button, Form, Select, Input, Row, Col, DatePicker } from "antd";
import should_icon from "../images/should_icon.png";
import acture_icon from "../images/acture_icon.png";
import need_icon from "../images/need_icon.png";
import percent_icon from "../images/percent_icon.png";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { firstPartList, tenantList, financeAnalysis } from "@/services/cockpit";
import moment from "moment";
import { formatAmount } from "@/utils/index";

const FinanceAnalysis = ({ backToHome, gotoFinanceList }, ref) => {
  const [projectList, setProjectList] = useState([]);
  const [firstPartLists, setFirstPartList] = useState([]);
  const [tenantLists, setTenantList] = useState([]);
  const [financeData, setFinanceData] = useState({});
  const [formRef] = Form.useForm();

  useEffect(() => {
    // getProjectList();
    // getFirstPartList();
    // getTenantList();
    // getDataSource();
    return () => {};
  }, []);

  useEffect(() => {
    var myChart = echarts.init(document.getElementById("chartsContainer"));
    // 绘制图表
    myChart.setOption({
      color: ["#0D61F5", "#FF3E3E"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        right: 80,
        textStyle: {
          color: "#0BC5FB",
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
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#24DCF0",
          },
        },

        data: financeData?.financeBillItemMonthVOS?.map((v) => v.month),
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
          name: "应收",
          type: "bar",
          data: financeData?.financeBillItemMonthVOS?.map(
            (v) => v.shouldAmount
          ),
        },
        {
          name: "实收",
          type: "bar",
          data: financeData?.financeBillItemMonthVOS?.map(
            (v) => v.actualAmount
          ),
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
  }, [financeData]);

  const getProjectList = async () => {
    const res = await simpleProjects({});
    if (res?.code === 0) {
      setProjectList(res.data);
    }
  };

  // 甲方
  const getFirstPartList = () => {
    firstPartList({}).then((res) => {
      if (res?.code === 0) {
        setFirstPartList(res.data || []);
      }
    });
  };

  // 租客
  const getTenantList = () => {
    tenantList({}).then((res) => {
      if (res?.code === 0) {
        setTenantList(res.data || []);
      }
    });
  };

  const getDataSource = () => {
    const values = formRef.getFieldsValue();
    values.queryStartTime = moment(values.year)
      .startOf("year")
      .format("YYYY-MM-DD");
    values.queryEndTime = moment(values.year)
      .endOf("year")
      .format("YYYY-MM-DD");
    console.log(values);
    financeAnalysis(values).then((res) => {
      if (res?.code === 0) {
        setFinanceData(res?.data || {});
      }
    });
  };

  const changeSearch = () => {
    getDataSource();
  };

  const resetSearch = () => {
    formRef.resetFields();
    changeSearch();
  };

  return (
    <div style={{ padding: "0 10px 10px" }}>
      <div>
        <Button
          style={{
            color: "#0BBDFB",
            background: " #031224",
            boxShadow: "inset 0px 1px 13px 0px #1084ff",
            border: "none",
            marginRight: 20,
            marginBottom: 5,
          }}
          onClick={() => backToHome("home")}
        >
          返回
        </Button>
      </div>
      <div>
        <div
          style={{
            padding: "15px 30px",
            background: "#19365B",
            border: "1px solid #4B81C5",
            boxShadow: "inset 0px 1px 11px 0px #135DEF",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
              paddingLeft: 16,
              borderLeft: "5px solid #2579FF",
            }}
          >
            财务情况分析
          </div>
        </div>
        <div
          style={{
            background: "#041D3C",
            border: "1px solid #4B81C5",
            borderTop: "none",
            padding: 24,
          }}
        >
          <div>
            <Form
              layout="inline"
              form={formRef}
              initialValues={{ year: moment() }}
              className="cockpit_form cockpit_table"
            >
              <Form.Item label="项目名称" name="projectId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {projectList?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="甲方" name="firstPartId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {firstPartLists?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="租客名称" name="tenantId">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={(e) => changeSearch()}
                  getPopupContainer={(node) => node.parentNode}
                >
                  {tenantLists?.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="日期" name="year">
                <DatePicker
                  picker="year"
                  onChange={(e) => changeSearch()}
                  style={{ width: 200 }}
                  allowClear={false}
                  popupClassName="cockpit_datepicker"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    boxShadow: "inset 0px 1px 13px 0px #1084ff",
                    background: "#03225F",
                    border: "none",
                    color: "#fff",
                  }}
                  onClick={() => resetSearch()}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div style={{ margin: "30px 0px 20px 0px" }}>
            <Row
              gutter={[30, 30]}
              style={{ cursor: "pointer" }}
              onClick={() => gotoFinanceList("financeList")}
            >
              <Col span={6}>
                <div
                  style={{
                    background: "#031830",
                    border: "1px solid #4388FF",
                    boxShadow: "inset 0px 1px 40px 0px #0B66C6",
                    padding: "30px 0 30px 13%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#0D61F5",
                      borderRadius: 12,
                      height: 70,
                      width: 70,
                      marginRight: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={should_icon} alt="" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        color: "#8FB8FF",
                        fontFamily: "Impact",
                      }}
                    >
                      {formatAmount(financeData.totalShouldAmount)}
                    </div>
                    <div style={{ fontSize: 18, color: "#65B7FF" }}>
                      应收总金额
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    background: "#031830",
                    border: "1px solid #4388FF",
                    boxShadow: "inset 0px 1px 40px 0px #0B66C6",
                    padding: "30px 0 30px 13%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#FE4A4A",
                      borderRadius: 12,
                      height: 70,
                      width: 70,
                      marginRight: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={acture_icon} alt="" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        color: "#FF9797",
                        fontFamily: "Impact",
                      }}
                    >
                      {formatAmount(financeData.totalActualAmount)}
                    </div>
                    <div style={{ fontSize: 18, color: "#65B7FF" }}>
                      实收总金额
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    background: "#031830",
                    border: "1px solid #4388FF",
                    boxShadow: "inset 0px 1px 40px 0px #0B66C6",
                    padding: "30px 0 30px 13%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#13BEAC",
                      borderRadius: 12,
                      height: 70,
                      width: 70,
                      marginRight: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={need_icon} alt="" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        color: "#2EF5E0",
                        fontFamily: "Impact",
                      }}
                    >
                      {formatAmount(financeData.totalNeedAmount)}
                    </div>
                    <div style={{ fontSize: 18, color: "#65B7FF" }}>
                      需收总金额
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    background: "#031830",
                    border: "1px solid #4388FF",
                    boxShadow: "inset 0px 1px 40px 0px #0B66C6",
                    padding: "30px 0 30px 13%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#D9D305",
                      borderRadius: 12,
                      height: 70,
                      width: 70,
                      marginRight: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={percent_icon} alt="" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        color: "#D9D305",
                        fontFamily: "Impact",
                      }}
                    >
                      {((financeData?.collectionRate || 0) * 100).toFixed(0)}%
                    </div>
                    <div style={{ fontSize: 18, color: "#65B7FF" }}>收缴率</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div
            style={{ height: "calc(100vh - 466px)", cursor: "pointer" }}
            id="chartsContainer"
            onClick={() => gotoFinanceList("financeList")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAnalysis;
