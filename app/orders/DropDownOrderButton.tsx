"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, LucideEdit } from "lucide-react";
import React from "react";
import { LuMoreVertical } from "react-icons/lu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Order } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import useOrder from "./useOrder";
import { useUser } from "@clerk/nextjs";
import useFetchedUser from "../users/useUsers";

interface Prop {
  order: Order;
}

export default function DropDownButton({ order }: Prop) {
  const router = useRouter();
  const { sortedOrder } = useOrder();
  const { user } = useUser();
  const { sortedUser } = useFetchedUser();

  async function onDelete(id: string) {
    const currentUser = sortedUser?.filter(
      (el) => el.email === user?.emailAddresses[0].emailAddress
    );

    try {
      if (user && currentUser && currentUser[0].role === "admin") {
        await axios.delete(`http://127.0.0.1:3003/api/orders/place/${id}`);
        toast.success("Order has being succesfully deleted");

        router.push("/orders");
        router.refresh();
      } else {
        if (!user)
          return toast.success(
            "You must signin first to be able to perfom the task"
          );

        toast.success("Only admin user can perfom that task");
      }
    } catch (err) {
      toast.error("Error in deleting Order", err!);
      console.error(err);
    }
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-8 flex justify-center rounded-md hover:bg-gray-400 transition-all duration-200 ">
            <LuMoreVertical className="h-8" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div
                className="flex gap-3 items-center text-gray-700"
                onClick={() => {
                  if (user) {
                    router.push(`/orders/${order._id}`);
                  } else {
                    toast.success(
                      "You must signin first to be able to perfom the task"
                    );
                  }
                }}
              >
                <EyeIcon className="w-5 h-5 text-gray-500" /> View
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                className="flex gap-3 items-center text-gray-700"
                onClick={() => {
                  onDelete(order._id);
                }}
              >
                <RiDeleteBin6Fill className="w-5 h-5 text-gray-500" /> Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
