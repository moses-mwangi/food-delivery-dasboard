"use client";

import { UserProfile } from "@clerk/nextjs";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
