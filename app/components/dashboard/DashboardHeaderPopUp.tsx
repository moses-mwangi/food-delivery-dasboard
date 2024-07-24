import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdFilterList } from "react-icons/md";

import useOrder from "@/app/orders/useOrder";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

const periods = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 15 days", value: 15 },
  { label: "Last 30 days", value: 30 },
];

interface Props {
  searchParams: { periods: string };
}

export default function DashboardHeaderPopUp() {
  const router = useRouter();
  const searchParam = useSearchParams();

  return (
    <div className="flex  lg:hidden justify-between items-center">
      <h1 className="2ll:text-3xl text-2xl font-semibold text-slate-700">
        Dashboard
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <MdFilterList className="w-7 h-7" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            <Card className="flex flex-col  gap-4 rounded-sm py-[3px] mt-10 px-3">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
