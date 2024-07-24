import React, { Suspense } from "react";
import FilterOrders from "./FilterOrders";
import SortOrder from "./SortOrder";
import OrderPopUpHeader from "./OrderPopUpHeader";

export default function OrdersHeader() {
  return (
    <>
      <OrderPopUpHeader />
      <div className="lg:flex hidden justify-between items-center">
        <h1 className="text-3xl font-semibold text-slate-700">
          All Our Orders
        </h1>
        <div className="flex gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <FilterOrders />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <SortOrder />
          </Suspense>
        </div>
      </div>
    </>
  );
}
