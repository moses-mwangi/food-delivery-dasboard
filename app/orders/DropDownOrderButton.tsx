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

interface Prop {
  order: Order;
}

export default function DropDownButton({ order }: Prop) {
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
            <DropdownMenuItem>
              <div
                className="flex gap-3 items-center text-gray-700"
                onClick={() => {
                  router.push(`/orders/${order._id}`);
                }}
              >
                <EyeIcon className="w-5 h-5 text-gray-500" /> View
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                className="flex gap-3 items-center text-gray-700"
                onClick={() => {
                  toast("Order deletion canceled", {
                    description: "Only admin users can delete",
                    action: {
                      label: "remove",
                      onClick: () => console.log("Undo"),
                    },
                  });
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
