import React from "react";
import FilterOrders from "./FilterOrders";
import SortOrder from "./SortOrder";

export default function OrdersHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-slate-700">All Our Orders</h1>
      <div className="flex gap-4">
        <FilterOrders />
        <SortOrder />
      </div>
    </div>
  );
}
