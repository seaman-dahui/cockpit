import LayoutTop from "./components/LayoutTop";
import CockpitHome from "./components/CockpitHome";
import TenantCharts from "./components/TenantCharts";
import HouseList from "./components/HouseList";
import FinanceAnalysis from "./components/FinanceAnalysis";
import { useState } from "react";
import FinanceList from "./components/FinanceList";

const Cockpit = () => {
  const [page, setPage] = useState("home");

  return (
    <div style={{ background: "#000" }} className="cockpit">
      <LayoutTop />
      {page == "home" && (
        <CockpitHome
          goTenantChart={setPage}
          goToHouseList={setPage}
          gotoAnalysis={setPage}
        />
      )}

      {page == "tenantCharts" && <TenantCharts backToHome={setPage} />}
      {page == "houseList" && <HouseList backToHome={setPage} />}
      {page == "financeAnalysis" && (
        <FinanceAnalysis backToHome={setPage} gotoFinanceList={setPage} />
      )}
      {page == "financeList" && <FinanceList gotoFinanceAnalysis={setPage} />}
    </div>
  );
};

export default Cockpit;
