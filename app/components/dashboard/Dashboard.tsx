import React, { Suspense } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardOperation from "./DashboardOperation";
import DashboardChart from "./DashboardChart";
import DashboardActivity from "./DashboardActivity";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9 md:px-5 lg:px-10 px-2 py-6 md:py-8 bg-gray-50">
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardHeader />
      </Suspense>
      <DashboardOperation />
      <DashboardActivity />
      <DashboardChart />
    </div>
  );
}
