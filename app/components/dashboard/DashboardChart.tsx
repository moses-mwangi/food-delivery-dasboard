"use client";
import useOrder from "@/app/orders/useOrder";
import { Card } from "@/components/ui/card";
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

  if (isLoading) return <p>Loading...</p>;
  if (ordersError) return <p>{ordersError?.message}</p>;

  const confirmedOrders = sortedOrder?.filter(
    (el) => el.status === "Confirmed"
  );

  const data = confirmedOrders?.map((order) => {
    const tooltip = {
      name: new Date(order.date)
        .toDateString()
        .split(" ")
        .splice(1, 2)
        .join(" "),
      // name: order.address.name.split(" ").at(0),
      price: order.totalAmount,
    };

    return tooltip;
  });

  return (
    <Card className="rounded-md my-7 p-5">
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
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
          />
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
