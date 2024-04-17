import { Card, Radio } from "antd";
import { useEffect, useState } from "react";
import { houseAreaStatistics } from "@/services/cockpit";

const label = {
  1: [
    "总建筑面积",
    "空置面积",
    "已租面积",
    "可租赁面积",
    "不招商面积",
    "特种用途面积",
  ],
  2: [
    "总房源套数",
    "空置套数",
    "已租套数",
    "招商套数",
    "不招商套数",
    "特种用途套数",
  ],
};

const labelValue = {
  1: [
    "totalBuildArea",
    "vacantArea",
    "leasedArea",
    "leasableArea",
    "noBusinessArea",
    "specialArea",
  ],
  2: [
    "totalBuildCnt",
    "vacantCnt",
    "leasedCnt",
    "leasableCnt",
    "noBusinessCnt",
    "specialCnt",
  ],
};

const OperateAnalysis = ({ goToHouseList }) => {
  const [houseInfo, setHouseInfo] = useState({});
  const [type, setType] = useState("1");

  useEffect(() => {
    // getHouseAreaStatistics();
    return () => {};
  }, []);

  const getHouseAreaStatistics = () => {
    houseAreaStatistics({}).then((res) => {
      if (res?.code === 0) {
        setHouseInfo(res.data || {});
      }
    });
  };

  const changeType = (e) => {
    setType(e.target.value);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        bordered={false}
        className="title_card"
        style={{ boxShadow: "inset 0px 1px 13px 0px #1084ff" }}
        title={
          <div style={{ color: "#DDFFFE", fontSize: 18 }}>运营情况分析</div>
        }
        extra={
          <Radio.Group
            options={[
              {
                label: "面积",
                value: "1",
              },
              {
                label: "套数",
                value: "2",
              },
            ]}
            optionType="button"
            buttonStyle="solid"
            value={type}
            onChange={changeType}
          />
        }
      >
        <Card
          bordered={false}
          className="statistic_card"
          style={{ background: "#08274a", padding: 0, marginBottom: 10 }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 30, color: "#0BFBD9", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][0]] || 0}
              </div>
              <div style={{ fontSize: 18, color: "#0BBDFB" }}>
                {label[type][0]}
              </div>
            </div>
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={async () => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 24, color: "#0BC5FB", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][1]] || 0}
              </div>
              <div style={{ fontSize: 16, color: "#0B87FB" }}>
                {label[type][1]}
              </div>
            </div>
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={async () => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 24, color: "#0BC5FB", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][2]] || 0}
              </div>
              <div style={{ fontSize: 16, color: "#0B87FB" }}>
                {label[type][2]}
              </div>
            </div>
          </div>
        </Card>
        <Card
          bordered={false}
          className="statistic_card"
          style={{ background: "#08274a", padding: 0 }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 24, color: "#0BC5FB", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][3]] || 0}
              </div>
              <div style={{ fontSize: 16, color: "#0B87FB" }}>
                {label[type][3]}
              </div>
            </div>
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 24, color: "#0BC5FB", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][4]] || 0}
              </div>
              <div style={{ fontSize: 16, color: "#0B87FB" }}>
                {label[type][4]}
              </div>
            </div>
            <div
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{ fontSize: 24, color: "#0BC5FB", fontFamily: "Impact" }}
              >
                {houseInfo[labelValue[type][5]] || 0}
              </div>
              <div style={{ fontSize: 16, color: "#0B87FB" }}>
                {label[type][5]}
              </div>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default OperateAnalysis;
