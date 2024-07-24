import React, { Suspense } from "react";
import StoresHeader from "./StoresHeader";
import StoresTable from "./StoresTable";

export default function page() {
  return (
    <div className="overflow-y-scroll h-[90svh] lg:px-10 px-3 py-6 lg:py-8 bg-gray-50">
      <div className="flex flex-col gap-9">
        <Suspense fallback={<p>Loading...</p>}>
          <StoresHeader />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <StoresTable />
        </Suspense>
      </div>
    </div>
  );
}
