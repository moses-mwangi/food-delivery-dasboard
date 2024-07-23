import React, { Suspense } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";

export default function UsersPage() {
  return (
    <div className="overflow-y-scroll h-[90svh] flex flex-col gap-10 px-10 py-8 bg-gray-50">
      <UserHeader />

      <Suspense fallback={<p>Loading...</p>}>
        <UserTable />
      </Suspense>
    </div>
  );
}
