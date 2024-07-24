"use client";
import React from "react";
import DashboardPierchat from "./DashboardPierchat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import useOrder from "@/app/orders/useOrder";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardActivity() {
  const { sortedOrder, isLoading, ordersError } = useOrder();

  if (isLoading)
    return (
      <div className="flex justify-between gap-2">
        <Card className="w-full h-80 bg-gray-100">
          <Skeleton className="w-full h-80 bg-gray-100" />
        </Card>
        <Card className="w-full h-80 bg-gray-100">
          <Skeleton className="w-full h-80 bg-gray-100" />
        </Card>
      </div>
    );
  if (ordersError) <p>Errorf...</p>;

  const recentOrders = sortedOrder?.slice(0, 5);

  return (
    // <div className="flex flex-row justify-between gap-2">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <Card className=" w-full rounded-md p-2 flex flex-col items-center">
        <span className=" text-[20px] font-medium my-4 flex">
          <h1
            className=" mx-auto"
            onClick={() => {
              console.log(recentOrders);
            }}
          >
            Recent orders from your store.
          </h1>
        </span>
        <Table>
          <TableHeader>
            <TableRow className="text-[16px]">
              <TableHead>Customer</TableHead>
              <TableHead className=" hidden 2ll:block">Type</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders?.map((pro) => (
              <TableRow key={pro._id} className=" text-[15px] opacity-85">
                <TableCell>
                  <span className="flex flex-col">
                    <p>{pro.address.name}</p>
                  </span>
                </TableCell>
                <TableCell className=" hidden 2ll:block">
                  {pro.items[0].type}
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      pro.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : pro.status === "Food Processing"
                        ? " bg-yellow-200 text-slate-700"
                        : "bg-red-100"
                    } py-1 px-2 rounded-full text-slate-800`}
                  >
                    {pro.status}
                  </span>
                </TableCell>

                <TableCell>${pro.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <DashboardPierchat />
    </div>
  );
}
