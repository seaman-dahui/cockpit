import { Card, Radio, Space, Button, Row, Col } from "antd";
import "../index.less";
import arrowRight from "../images/arrow.png";
import mapLeftIcon from "../images/map_left_icon.png";
import mapRightIcon from "../images/map_right_icon.png";
import TenantIndustry from "./TenantIndustry";
import industryIcon from "../images/industry.png";
import companyIcon from "../images/company.png";
import inhouseIcon from "../images/inhouse.png";
import tenant_unitIcon from "../images/tenant_unit.png";
import { useEffect, useState } from "react";
import IndustryAnalysis from "./tenantCharts/IndustryAnalysis";
import InhouseAnalysis from "./tenantCharts/InhouseAnalysis";
import UserCompanyAnalysis from "./tenantCharts/UserCompanyAnalysis";
import TenantUnitPrice from "./tenantCharts/TenantUnitPrice";
import UserCategory from "./tenantCharts/UserCategory";

const analysisList = [
  { key: "industryAnalysis", name: "行业分类分析", icon: industryIcon },
  { key: "inhouseAnalysis", name: "入住情况分析", icon: inhouseIcon },
  { key: "userCompanyAnalysis", name: "用户单位性质", icon: companyIcon },
  { key: "tenantUnitPrice", name: "租客均价分析", icon: tenant_unitIcon },
  { key: "userCategory", name: "用户类型分析", icon: inhouseIcon },
];

const TenantCharts = ({ backToHome }, ref) => {
  const [activeCard, setActive] = useState("industryAnalysis");
  useEffect(() => {
    return () => {};
  }, []);

  const changeAnalysis = (v) => {
    setActive(v.key);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {/* 左侧 */}
        <div style={{ marginBottom: 10 }}>
          <Card
            bordered={false}
            className="title_card"
            style={{ boxShadow: "inset 0px 1px 13px 0px #1084ff" }}
            title={
              <div style={{ color: "#DDFFFE", fontSize: 18 }}>租客画像</div>
            }
          >
            <Row gutter={[12, 12]} className="tenant_chart_card_wrap">
              {analysisList.map((v) => (
                <Col key={v.key} span={12} onClick={() => changeAnalysis(v)}>
                  <div
                    className={
                      activeCard == v.key
                        ? "tenant_chart_card_item active"
                        : "tenant_chart_card_item"
                    }
                  >
                    <div>
                      <img src={v.icon} alt="" height={55} />
                    </div>
                    <div
                      style={{ color: "#65B7FF", fontSize: 18, marginTop: 10 }}
                    >
                      {v.name}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </div>
      <div style={{ flex: 2.8, display: "flex", flexDirection: "row" }}>
        {activeCard == "industryAnalysis" && (
          <IndustryAnalysis backToHome={backToHome} />
        )}
        {activeCard == "inhouseAnalysis" && (
          <InhouseAnalysis backToHome={backToHome} />
        )}
        {activeCard == "userCompanyAnalysis" && (
          <UserCompanyAnalysis backToHome={backToHome} />
        )}
        {activeCard == "tenantUnitPrice" && (
          <TenantUnitPrice backToHome={backToHome} />
        )}
        {activeCard == "userCategory" && (
          <UserCategory backToHome={backToHome} />
        )}
      </div>
    </div>
  );
};

export default TenantCharts;
