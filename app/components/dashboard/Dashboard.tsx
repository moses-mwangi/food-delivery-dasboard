import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardOperation from "./DashboardOperation";
import DashboardChart from "./DashboardChart";
import DashboardActivity from "./DashboardActivity";
// import DashboardChart from "./DashboardChat copy";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9 px-10 py-8 bg-gray-50">
      <DashboardHeader />
      <DashboardOperation />
      <DashboardActivity />
      <DashboardChart />
    </div>
  );
}
