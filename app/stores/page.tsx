import React from "react";
import StoresHeader from "./StoresHeader";
import StoresTable from "./StoresTable";

export default function page() {
  return (
    <div className="overflow-y-scroll h-[90svh] px-10 py-8 bg-gray-50">
      <div className="flex flex-col gap-9">
        <StoresHeader />
        <StoresTable />
      </div>
    </div>
  );
}
