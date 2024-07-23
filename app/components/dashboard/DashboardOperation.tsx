"use client";
import useOrder from "@/app/orders/useOrder";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";

export default function DashboardOperation() {
  const { sortedOrder, isLoading, ordersError } = useOrder();

  if (isLoading) <p>Loading...</p>;
  if (ordersError) <p>Errorf...</p>;

  const ordersCount = sortedOrder?.length;
  const ordersSales = sortedOrder
    ?.map((el) => el.totalAmount)
    .reduce((acc, arr) => acc + arr);
  const ordersConfirmed = sortedOrder?.filter(
    (el) => el.status === "Confirmed"
  ).length;

  const OrderSalesRate = ((ordersCount! * 100) / ordersSales!).toFixed(2);

  if (isLoading)
    return (
      <div className="flex gap-2">
        <Card className="rounded-md  h-24 w-full">
          <Skeleton className="w-full h-full bg-gray-100" />
        </Card>
        <Card className="rounded-md  h-24 w-full">
          <Skeleton className="w-full h-full bg-gray-100" />
        </Card>
        <Card className="rounded-md  h-24 w-full">
          <Skeleton className="w-full h-full bg-gray-100" />
        </Card>
        <Card className="rounded-md  h-24 w-full">
          <Skeleton className="w-full h-full bg-gray-100" />
        </Card>
      </div>
    );

  return (
    <div className="flex gap-2">
      <Card className="flex gap-3 items-center pl-5 rounded-md  h-24 w-full">
        <HiOutlineBriefcase className="w-16 h-16 p-4 rounded-full bg-blue-500" />
        <div className=" flex flex-col">
          <span className=" text-[14px] font-medium">ORDERS</span>
          <span className="font-semibold text-[23px]">{ordersCount}</span>
        </div>
      </Card>
      <Card className="flex gap-3 items-center pl-5 rounded-md h-24 w-full">
        <HiOutlineBanknotes className="w-16 h-16 p-4 rounded-full bg-green-700" />
        <div className=" flex flex-col">
          <span className=" text-[14px] font-medium">SALES</span>
          <span className="font-semibold text-[23px]">{`$${ordersSales}`}</span>
        </div>
      </Card>
      <Card className="flex gap-3 items-center pl-5 rounded-md h-24 w-full">
        <HiOutlineCalendar className="w-16 h-16 p-4 rounded-full bg-indigo-600" />
        <div className=" flex flex-col">
          <span className=" text-[14px] font-medium">ARCHIVED</span>
          <span className="font-semibold text-[23px]">{`${ordersConfirmed}`}</span>
        </div>
      </Card>
      <Card className="flex gap-3 items-center pl-5 rounded-md h-24 w-full ">
        <HiOutlineChartBar className="w-16 h-16 p-4 rounded-full bg-amber-700" />
        <div className=" flex flex-col">
          <span className=" text-[14px] font-medium">SALES RATES</span>
          <span className="font-semibold text-[23px]">{`${OrderSalesRate}%`}</span>
        </div>
      </Card>
    </div>
  );
}
