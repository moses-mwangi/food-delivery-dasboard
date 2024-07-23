import React, { Suspense } from "react";
import SortUser from "./sortUser";

export default function UserHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-slate-700">All Our Users</h1>
      <div className="flex gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <SortUser />
        </Suspense>
      </div>
    </div>
  );
}
