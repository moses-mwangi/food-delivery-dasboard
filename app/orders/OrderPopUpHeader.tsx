"use client";

import React, { Suspense } from "react";
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
import FilterOrders from "./FilterOrders";
import SortOrder from "./SortOrder";

const periods = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 15 days", value: 15 },
  { label: "Last 30 days", value: 30 },
];

interface Props {
  searchParams: { periods: string };
}

export default function OrderPopUpHeader() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const { isLoading } = useOrder();

  return (
    <div className="flex  lg:hidden justify-between items-center">
      <h1 className="2ll:text-3xl text-2xl font-semibold text-slate-700">
        All Our Orders
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
            <div className="flex flex-col mt-9 gap-6">
              <Suspense fallback={<div>Loading...</div>}>
                <FilterOrders />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <SortOrder />
              </Suspense>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
