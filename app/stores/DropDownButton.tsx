"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideEdit } from "lucide-react";
import { LuMoreVertical } from "react-icons/lu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FoodList } from "../types";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import useFetchedUser from "../users/useUsers";
import axios from "axios";
import useStore from "./useStore";

interface Props {
  res: {
    _id: string;
    image: string;
    restName: string;
    location: string;
    deliveryPrice: number;
    food_lists: FoodList[];
  };
}

export default function DropDownButton({ res }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const { sortedUser } = useFetchedUser();
  const { stores } = useStore();

  const currentUser = sortedUser?.filter(
    (el) => el.email === user?.emailAddresses[0].emailAddress
  );

  async function onDeleteStore(id: string) {
    const store = stores?.find((el) => el._id === id);

    try {
      if (user && currentUser && currentUser[0].role === "admin") {
        await axios.delete(
          `http://127.0.0.1:3003/api/restaurants/${store?.restName}`
        );
        toast.success("You have succesfully deleted store");
        router.push("/stores");
      } else {
        if (!user)
          return toast.success(
            "You must signin first to be able to perfom the task"
          );

        toast.success("Only admin user can perfom that task");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error in deleting store");
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
                  onDeleteStore(res._id);
                }}
              >
                <RiDeleteBin6Fill className="w-5 h-5 text-gray-500" />
                Delete
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (user) {
                  router.push(`/stores/${res._id}/patchStore`);
                } else {
                  toast.success("You have to sign-in first");
                }
              }}
            >
              <div className="flex gap-3 items-center text-gray-700">
                <LucideEdit className="w-5 h-5 text-gray-500" /> Patch
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
