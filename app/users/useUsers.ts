import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Order, TypeRestaurant, User } from "../types";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function useFetchedUser() {
  const searchParam = useSearchParams();

  const {
    data: allUsers,
    error: usersError,
    isLoading,
  } = useQuery<User>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User>(
        `https://food-backend-xi.vercel.app/api/users`
      );

      return response.data;
    },
  });

  ////////SortedOrder

  let sortedUser = allUsers?.data.data;
  const sortBy = searchParam.get("SortBy");
  if (sortBy === "city")
    sortedUser = allUsers?.data.data.sort((a, b) =>
      a.city.localeCompare(b.city)
    );
  if (sortBy === "name")
    sortedUser = allUsers?.data.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  if (sortBy === "role")
    sortedUser = allUsers?.data.data.sort((a, b) =>
      a.role.localeCompare(b.role)
    );

  return { sortedUser, isLoading, usersError };
}
