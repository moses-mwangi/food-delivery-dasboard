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
import { FoodList, TypeRestaurant } from "../types";
import { useRouter } from "next/navigation";

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
            <DropdownMenuItem
              onClick={() => {
                router.push(`/stores/${res._id}`);
              }}
            >
              <div className="flex gap-3 items-center text-gray-700">
                <EyeIcon className="w-5 h-5 text-gray-500" /> View
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex gap-3 items-center text-gray-700">
                <RiDeleteBin6Fill className="w-5 h-5 text-gray-500" /> Delete
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/stores/${res._id}/patchStore`);
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