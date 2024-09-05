import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import PerformanceChart from "./PerformanceChart";
import DayParting from "./DayParting";
function Dashboard() {
  return (
    <div className="layout">
      <div className="side">
        {" "}
        <SideBar />
      </div>
   <div className="main-content">
   <div className="card ">
        {" "}
        <TopBar />
      </div>
      <div className="card m-2 ">
        {" "}
        <PerformanceChart />
      </div>
      <div className="card m-2">
        <DayParting />
      </div>
   </div>
    </div>
  );
}

export default Dashboard;
