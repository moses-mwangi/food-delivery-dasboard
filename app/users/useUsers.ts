import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TypeRestaurant } from "../types";
import axios from "axios";

export default function useUsers() {
  const {
    data: users,
    error: usersError,
    isLoading,
  } = useQuery<TypeRestaurant[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<TypeRestaurant[]>(`/api/users`);
      return response.data;
    },
  });

  return { users, isLoading, usersError };
}
