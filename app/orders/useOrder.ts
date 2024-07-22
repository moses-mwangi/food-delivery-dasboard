import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Order, TypeRestaurant } from "../types";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function useOrder() {
  const searchParam = useSearchParams();

  const {
    data: orders,
    error: ordersError,
    isLoading,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get<Order[]>(`/api/orders`);
      return response.data;
    },
  });

  const arrangeOrdersToDate = orders?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  ///////Filtering Orders
  let operatedOrder = arrangeOrdersToDate;
  const days = searchParam.get("periods");

  if (Number(days)) operatedOrder = arrangeOrdersToDate?.slice(0, Number(days));
  if (days === "all") operatedOrder = arrangeOrdersToDate;

  ////////SortedOrder
  let sortedOrder = operatedOrder;
  const sortBy = searchParam.get("SortBy");
  if (sortBy === "createdAt")
    sortedOrder = operatedOrder?.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  if (sortBy === "name")
    sortedOrder = operatedOrder?.sort((a, b) =>
      a.address.name.localeCompare(b.address.name)
    );
  if (sortBy === "amount")
    sortedOrder = operatedOrder?.sort((a, b) => a.totalAmount - b.totalAmount);

  return { orders, sortedOrder, isLoading, ordersError };
}