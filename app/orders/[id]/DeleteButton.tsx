"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import useOrder from "../useOrder";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import useFetchedUser from "@/app/users/useUsers";
import axios from "axios";

export default function DeleteButton() {
  const { sortedOrder } = useOrder();
  const { id } = useParams();
  const { user } = useUser();
  const { sortedUser } = useFetchedUser();
  const router = useRouter();

  const deleteOrder = sortedOrder?.filter((el) => el._id !== id);
  const currentUser = sortedUser?.filter(
    (el) => el.email === user?.emailAddresses[0].emailAddress
  );

  async function onDelete() {
    try {
      if (currentUser && currentUser[0].role === "admin") {
        await axios.delete(
          `https://food-backend-xi.vercel.app/api/orders/place/${id}`
        );
        toast.success("Order has being succesfully deleted");

        router.push("/orders");
      } else {
        toast.success("Only admin user can perfom that task");
      }
    } catch (err) {
      toast.error("Error in deleting Order", err!);
      console.error(err);
    }
  }

  return (
    <div>
      <Button
        className="bg-blue-700 hover:bg-blue-600 w-24 h-8"
        onClick={() => {
          onDelete();
        }}
      >
        Delete Order
      </Button>
    </div>
  );
}
