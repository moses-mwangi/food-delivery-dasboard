"use client";
import useOrder from "@/app/orders/useOrder";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
  extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
  text: "#1e293b",
  background: "#f9fafb",
};

export default function DashboardChart() {
  const { sortedOrder, isLoading, ordersError } = useOrder();

  if (isLoading)
    return (
      <Card className="w-full h-80 bg-gray-100">
        <Skeleton className="w-full h-80 bg-gray-100" />
      </Card>
    );

  if (ordersError) return <p>{ordersError?.message}</p>;

  const confirmedOrders = sortedOrder?.filter(
    (el) => el.status === "Confirmed"
  );

  const data = confirmedOrders?.map((order) => {
    return {
      name: new Date(order.date)
        .toDateString()
        .split(" ")
        .splice(1, 2)
        .join(" "),
      price: order.totalAmount,
    };
  });

  return (
    <Card className="rounded-md my-7 p-5 hidden 2ll:block">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data}>
          <XAxis
            dataKey="name"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            domain={["auto", "auto"]}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="price"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Amount"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
