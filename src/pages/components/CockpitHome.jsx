import { Card, Radio, Space, Button } from "antd";
import "../index.less";
import arrowRight from "../images/arrow.png";

import LGMap from "./LGMap";
import TenantIndustry from "./TenantIndustry";
import {} from "@/services/cockpit";
import { useState, useEffect } from "react";
import OperateAnalysis from "./OperateAnalysis";
import ProjectLocation from "./ProjectLocation";

const CockpitHome = ({ goTenantChart, goToHouseList, gotoAnalysis }, ref) => {
  const [projectStatistics, setProjectStatistics] = useState({});
  const [rentInfo, setRentInfo] = useState({});
  const [tenantInfo, setTenantInfo] = useState({});
  const [tenantList, setTenants] = useState([]);
  const [tenantType, setTenantType] = useState(false);

  useEffect(() => {
    // projectStatisticsInfo();
    // getRentInfo();
    // getTenantStatistics();
    return () => {};
  }, []);

  const projectStatisticsInfo = () => {
    getProjectStatistics({}).then((res) => {
      if (res?.code === 0) {
        setProjectStatistics(res.data);
      }
    });
  };

  const getRentInfo = () => {
    rentStatistics({}).then((res) => {
      if (res?.code === 0) {
        setRentInfo(res.data || {});
      }
    });
  };
  const getTenantStatistics = () => {
    tenantStatistics({}).then((res) => {
      if (res?.code === 0) {
        setTenantInfo(res.data || {});
      }
    });
  };

  const gotoTenantList = (type) => {
    setTenantType(type);
    // getTenants(type);
  };

  const getTenants = (type) => {
    // type:租客类型1企业 2个人
    tenantContracts({ type }).then((res) => {
      if (res?.code === 0) {
        setTenants(res.data || []);
      }
    });
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 90px)" }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 10 }}>
          <Card
            bordered={false}
            style={{
              boxShadow: "inset 0px 1px 13px 0px #1084ff",
              background: "#000",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => goToHouseList("houseList")}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "4px solid #043f59",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    color: "#0BFBD9",
                    fontFamily: "Impact",
                  }}
                >
                  {projectStatistics.projectCnt || 0}
                </div>
                <div style={{ fontSize: 18, color: "#0BBDFB" }}>总项目数</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 24,
                    color: "#0BC5FB",
                    fontFamily: "Impact",
                  }}
                >
                  {projectStatistics.businessProjectCnt || 0}
                </div>
                <div style={{ fontSize: 16, color: "#0B87FB" }}>商业</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 24,
                    color: "#0BC5FB",
                    fontFamily: "Impact",
                  }}
                >
                  {projectStatistics.residenceProjectCnt || 0}
                </div>
                <div style={{ fontSize: 16, color: "#0B87FB" }}>住宅</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 24,
                    color: "#0BC5FB",
                    fontFamily: "Impact",
                  }}
                >
                  {projectStatistics.buildingProjectCnt || 0}
                </div>
                <div style={{ fontSize: 16, color: "#0B87FB" }}>楼宇</div>
              </div>
            </div>
          </Card>
        </div>
        <OperateAnalysis goToHouseList={goToHouseList} />
        <ProjectLocation goToHouseList={goToHouseList} />
      </div>
      <div style={{ flex: 1.8, display: "flex", flexDirection: "column" }}>
        {/* 中间 */}
        <LGMap />
      </div>
      <div style={{ flex: 1 }}>
        {!tenantType && (
          <>
            <div style={{ marginBottom: 10 }}>
              <Card
                bordered={false}
                className="title_card"
                style={{
                  background: "#000",
                  boxShadow: "inset 0px 1px 13px 0px #1084ff",
                }}
                title={
                  <div style={{ color: "#DDFFFE", fontSize: 18 }}>
                    财务情况分析
                  </div>
                }
                extra={
                  <Button
                    type="link"
                    style={{ color: "#DDFFFE" }}
                    onClick={() => gotoAnalysis("financeAnalysis")}
                  >
                    更多&gt;
                  </Button>
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#08274a",
                    marginBottom: 10,
                  }}
                  onClick={() => gotoAnalysis("financeAnalysis")}
                >
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      boxShadow: " inset 0px 1px 13px 0px #1084ff",
                      padding: "24px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.shouldAmount || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月应收含税
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.actualAmount || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月实收含税
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.needAmount || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月需收含税
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#08274a",
                  }}
                  onClick={() => gotoAnalysis("financeAnalysis")}
                >
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      boxShadow: " inset 0px 1px 13px 0px #1084ff",
                      padding: "24px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.shouldAmountNonTax || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月应收不含税
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.actualAmountNonTax || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月实收不含税
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 24,
                        color: "#0BC5FB",
                        fontFamily: "Impact",
                      }}
                    >
                      {rentInfo.needAmountNonTax || 0}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      本月需收不含税
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ marginBottom: 10 }}>
              <Card
                bordered={false}
                className="title_card"
                style={{
                  background: "#000",
                  boxShadow: "inset 0px 1px 13px 0px #1084ff",
                }}
                title={
                  <div style={{ color: "#DDFFFE", fontSize: 18 }}>
                    租客画像分析
                  </div>
                }
                extra={
                  <Button
                    type="link"
                    style={{ color: "#DDFFFE" }}
                    onClick={() => goTenantChart("tenantCharts")}
                  >
                    更多&gt;
                  </Button>
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",

                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      boxShadow: " inset 0px 1px 13px 0px #1084ff",
                      padding: "24px 0",
                      marginRight: 10,
                      position: "relative",
                      background: "#08274a",
                    }}
                    onClick={() => gotoTenantList(1)}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: 28,
                          color: "#E87437",
                          fontFamily: "Impact",
                        }}
                      >
                        {tenantInfo.companyTenantCnt}
                      </div>
                      <div style={{ fontSize: 16, color: "#E87437" }}>
                        当前单位租客
                      </div>
                    </div>
                    <div style={{ position: "absolute", right: 20 }}>
                      <img src={arrowRight} alt="" />
                    </div>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      boxShadow: " inset 0px 1px 13px 0px #1084ff",
                      padding: "24px 0",
                      marginRight: 10,
                      position: "relative",
                      background: "#08274a",
                    }}
                    onClick={() => gotoTenantList(2)}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: 28,
                          color: "#E9D75F",
                          fontFamily: "Impact",
                        }}
                      >
                        {tenantInfo.personTenantCnt}
                      </div>
                      <div style={{ fontSize: 16, color: "#E9D75F" }}>
                        当前个人租客
                      </div>
                    </div>
                    <div style={{ position: "absolute", right: 20 }}>
                      <img src={arrowRight} alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <TenantIndustry info={tenantInfo.tenantIndustryResponseVOS} />
                </div>
              </Card>
            </div>
          </>
        )}

        {tenantType && (
          <Card
            bordered={false}
            className="title_card"
            style={{
              background: "#000",
              boxShadow: "inset 0px 1px 13px 0px #1084ff",
            }}
            title={
              <div style={{ color: "#DDFFFE", fontSize: 18 }}>
                当前{tenantType == 1 ? "单位" : tenantType == 2 ? "个人" : ""}
                租客
              </div>
            }
            extra={
              <Button
                style={{
                  color: "#DDFFFE",
                  background: "rgba(3, 123, 121, 0.6833)",
                  border: "1px solid #1CC7C3",
                }}
                onClick={() => setTenantType(false)}
              >
                返回
              </Button>
            }
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 24px",
                  boxShadow: "inset 0px 1px 13px 0px #1084ff",
                  background: "#022851",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                <div>
                  {tenantType == 1
                    ? "公司名称"
                    : tenantType == 2
                      ? "租客名称"
                      : ""}
                </div>
                <div>签约数(房源)</div>
              </div>

              <div
                style={{
                  height: "calc(100vh - 220px)",
                  overflow: "auto",
                  scrollbarWidth: "none",
                  boxShadow: "inset 0px 1px 13px 0px #1084ff",
                  padding: "0 3px",
                }}
              >
                {tenantList.map((v, i) => (
                  <div
                    key={v.id}
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
                    <div
                      style={{ flex: 1, display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={arrowRight}
                        alt=""
                        style={{ marginRight: 10 }}
                      />
                      <div>{v.name}</div>
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      {v.contractNum}
                      <img
                        src={arrowRight}
                        alt=""
                        style={{ margin: "0 10px 0 5px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CockpitHome;
