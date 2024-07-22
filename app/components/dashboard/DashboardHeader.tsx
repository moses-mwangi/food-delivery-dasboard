"use client";

import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const periods = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 15 days", value: 15 },
  { label: "Last 30 days", value: 30 },
];

interface Props {
  searchParams: { periods: string };
}

export default function DashboardHeader() {
  const path = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-slate-700">Dashboard</h1>
      <Card className="flex gap-4 rounded-sm py-[3px] px-3">
        {periods.map((period) => (
          <span
            key={period.label}
            className={`${
              period.value.toString() === searchParam.get("periods")
                ? " bg-blue-600 text-slate-50"
                : ""
            } hover:bg-blue-600 px-3 py-1 text-slate-700 hover:text-slate-100  rounded-md cursor-pointer transition-all duration-300`}
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
    </div>
  );
}
