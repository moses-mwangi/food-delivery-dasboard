import React, { Suspense } from "react";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";

export default function OrdersPage() {
  return (
    <div className="overflow-y-scroll h-[90svh] px-3 py-4 lg:px-10 lg:py-8 bg-gray-50">
      <div className="flex flex-col gap-9">
        <OrdersHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <OrdersTable />
        </Suspense>
      </div>
    </div>
  );
}
