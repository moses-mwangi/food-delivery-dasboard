import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteButton from "./DeleteButton";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Order {
  single:
    | {
        _id: string;
        status: string;
        totalAmount: number;
        date: Date;
        payment: boolean;
        address: {
          _id: string;
          name: string;
          email: string;
          country: string;
          city: string;
          address: string;
        };
        items: [
          {
            _id: string;
            type: string;
            description: string;
            rating: number;
            price: number;
          }
        ];
      }
    | undefined;

  params: { id: string };
}

export default function OrderChangeStatus({ single, params }: Order) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateOrder = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3003/api/orders/${params.id}`,
        {
          status: searchParams.get("Status")
            ? searchParams.get("Status")
            : "Confirmed",
        }
      );

      console.log("Order updated:", response.data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 justify-end mb-16 items-center ml-auto md:w-[35%]">
        <Select
          defaultValue={searchParams.get("SortBy") || ""}
          disabled={single?.status === "Confirmed"}
          onValueChange={(order) => {
            const params = new URLSearchParams(searchParams);
            params.set("Status", order.toString());
            router.push("?" + params.toString());

            updateOrder();
            router.push("/orders");
            router.refresh();
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Set food status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup defaultValue="">
              <SelectItem value="Confirmed">Confirmed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DeleteButton />
      </div>
    </div>
  );
}
