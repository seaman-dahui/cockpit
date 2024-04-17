import { Card, Radio } from "antd";
import { useEffect, useState } from "react";
import { projectAreaStatistics } from "@/services/cockpit";

const label = {
  1: ["总房源面积", "已租面积", "出租率"],
  2: ["总房源套数", "已租套数", "出租率"],
};

const labelValue = {
  1: ["totalBuildArea", "leasedArea", "occupancyRate"],
  2: ["totalBuildCnt", "leasedCnt", "occupancyCntRate"],
};
const ProjectLocation = ({ goToHouseList }) => {
  const [projectList, setProjectList] = useState([]);
  const [type, setType] = useState("1");

  useEffect(() => {
    // getProjectAreaStatistics();

    return () => {};
  }, []);

  const getProjectAreaStatistics = () => {
    projectAreaStatistics({}).then((res) => {
      if (res?.code === 0) {
        setProjectList(res.data || []);
      }
    });
  };
  const changeType = (e) => {
    setType(e.target.value);
  };

  const statusColor = (n) => {
    let color = "";
    if (n <= 0.33) {
      color = "#FA5151";
    } else if (n > 0.33 && n <= 0.66) {
      color = "#FF8F1F";
    } else {
      color = "#0BC5FB";
    }
    return color;
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        bordered={false}
        className="title_card"
        style={{ boxShadow: "inset 0px 1px 13px 0px #1084ff" }}
        title={
          <div style={{ color: "#DDFFFE", fontSize: 18 }}>项目分布情况</div>
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
        <div
          style={{
            height: "calc(100vh - 635px)",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          {projectList.map((v) => (
            <div
              key={v.projectId}
              style={{ display: "flex", cursor: "pointer" }}
              onClick={async () => {
                goToHouseList("houseList");
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 99,
                  textAlign: "center",
                  padding: 12,
                  background: "#031830",
                  boxShadow: "inset 0px 1px 13px 0px #1084ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="ellipsis-multiline"
                  style={{
                    fontSize: 16,
                    color: "#98E7FF",
                  }}
                  title={v.projectName}
                >
                  {v.projectName}
                </div>
              </div>
              <Card
                bordered={false}
                className="statistic_card little"
                style={{
                  flex: 1,
                  background: "#08274a",
                  padding: 0,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 22,
                        color: "#0BFBD9",
                        fontFamily: "Impact",
                      }}
                    >
                      {v[labelValue[type][0]]}
                    </div>
                    <div style={{ fontSize: 16, color: "#0BBDFB" }}>
                      {label[type][0]}
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
                      {v[labelValue[type][1]]}
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      {label[type][1]}
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 24,
                        color: statusColor(v[labelValue[type][2]]),
                        fontFamily: "Impact",
                      }}
                    >
                      {(v[labelValue[type][2]] * 100).toFixed(0)}%
                    </div>
                    <div style={{ fontSize: 16, color: "#0B87FB" }}>
                      {label[type][2]}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProjectLocation;
