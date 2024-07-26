"use client";

import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const periods = [
  { label: "All", value: "all" },
  { label: "Last 7 days", value: 7 },
  { label: "Last 14 days", value: 14 },
];

export default function FilterOrders() {
  const path = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();

  return (
    <Card className="flex md:flex-row flex-col  gap-4 rounded-sm py-[3px] px-3">
      {periods.map((period) => (
        <span
          key={period.label}
          className={`${
            period.value.toString() === searchParam.get("periods")
              ? "bg-blue-600 text-slate-200"
              : ""
          } hover:bg-blue-600 px-3 py-1 text-slate-700 hover:text-slate-100  rounded-md cursor-pointer transition-colors`}
          onClick={() => {
            const params = new URLSearchParams(searchParam);
            params.set("periods", period.value.toString());
            const query = params.size ? "?" + params.toString() : "";

            router.push(`?${params.toString()}`);
          }}
        >
          {period.label}
        </span>
      ))}
    </Card>
  );
}
