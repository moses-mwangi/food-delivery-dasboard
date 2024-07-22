import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TypeRestaurant } from "../types";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function useStore() {
  const searchParam = useSearchParams();

  const {
    data: stores,
    error: storeError,
    isLoading,
  } = useQuery<TypeRestaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await axios.get<TypeRestaurant[]>(`/api/restaurants`);
      return response.data;
    },
  });

  ////////SortedOrder
  let sortedStores = stores;
  const sortBy = searchParam.get("SortBy");

  if (sortBy === "Name")
    sortedStores = sortedStores?.sort((a, b) =>
      a.restName.localeCompare(b.restName)
    );
  if (sortBy === "Price")
    sortedStores = sortedStores?.sort(
      (a, b) => a.deliveryPrice - b.deliveryPrice
    );

  return { stores, isLoading, storeError };
}
