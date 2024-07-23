"use client";
import useOrder from "@/app/orders/useOrder";
import { Order } from "@/app/types";
import { Card } from "@/components/ui/card";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SalesData {
  name: string;
  value: number;
  color: string;
}

const initialSalesData: SalesData[] = [
  { name: "30- sales", value: 0, color: "#0088FE" },
  { name: "33- sales", value: 0, color: "#00C49F" },
  { name: "36- sales", value: 0, color: "#FFBB28" },
  { name: "38- sales", value: 0, color: "#1d4ed8" },
  { name: "40- sales", value: 0, color: "#7e22ce" },
  { name: "42- sales", value: 0, color: "#FF8042" },
  { name: "42+ sales", value: 0, color: "#ff42e0" },
];

function prepareData(salesData: SalesData[], orders: Order[]) {
  const updatedSalesData = orders.reduce(
    (acc, order) => {
      const { totalAmount } = order;

      if (totalAmount <= 30) acc[0].value += 1;
      else if (totalAmount <= 33) acc[1].value += 1;
      else if (totalAmount <= 36) acc[2].value += 1;
      else if (totalAmount <= 38) acc[3].value += 1;
      else if (totalAmount <= 40) acc[4].value += 1;
      else if (totalAmount <= 42) acc[5].value += 1;
      else acc[6].value += 1;

      return acc;
    },
    [...salesData]
  );

  return updatedSalesData.filter((data) => data.value > 0);
}

export default function DashboardPieChart() {
  const { sortedOrder, isLoading } = useOrder();

  const data = prepareData(initialSalesData, sortedOrder || []);

  return (
    <Card className="w-full rounded-md flex flex-col items-center">
      <span className="text-xl font-medium mt-5 w-full">
        <h1 className="pl-4 text-xl font-semibold">Total Sales Duration</h1>
      </span>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            outerRadius={110}
            innerRadius={85}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={16}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
