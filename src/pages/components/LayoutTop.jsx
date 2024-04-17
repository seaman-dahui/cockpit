import moment from "moment";
import "../index.less";
import WetherCard from "./WetherCard";
import { useEffect, useState } from "react";
let timer = null;
const LayoutTop = () => {
  const currentUser = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : {};
  const [dateNow, setDateNow] = useState(moment());

  useEffect(() => {
    getTime();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getTime = () => {
    timer = setInterval(() => {
      setDateNow(moment());
    }, 1000);
  };

  return (
    <div>
      <div className="top_layout">
        <div className="top_nav_wrap">
          <div className="top_nav_item active" style={{ marginLeft: 100 }}>
            首页
          </div>
        </div>
        <div className="top-title">资产管理平台数据驾驶舱</div>
        <div className="top_right">
          <div>{moment(dateNow).format("YYYY-MM-DD HH:mm:ss dddd")}</div>
          <div>
            <WetherCard cockpit />
          </div>
          <div>
            {currentUser.name}（{currentUser.roleName}）
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTop;
