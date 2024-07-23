import React from "react";
import AddingStores from "./AddingStores";

export default function AddingStorePage() {
  return (
    <div className="px-14 py-8 bg-gray-50 overflow-y-scroll h-[90svh]">
      <div>
        <h1 className="flex justify-center text-3xl font-semibold text-slate-600">
          Adding Stores to our Website
        </h1>
      </div>
      <div>
        <AddingStores />
      </div>
    </div>
  );
}
