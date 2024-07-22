import React from "react";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";

export default function OrdersPage() {
  return (
    <div className="overflow-y-scroll h-[90svh] px-10 py-8 bg-gray-50">
      <div className="flex flex-col gap-9">
        <OrdersHeader />
        <OrdersTable />
      </div>
    </div>
  );
}
