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
import { useUser } from "@clerk/nextjs";
import useFetchedUser from "@/app/users/useUsers";
import { toast } from "sonner";

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
  const { user } = useUser();
  const { sortedUser } = useFetchedUser();

  const currentUser = sortedUser?.filter(
    (el) => el.email === user?.emailAddresses[0].emailAddress
  );

  const updateOrder = async () => {
    try {
      if (currentUser && currentUser[0].role === "admin") {
        await axios.patch(
          `https://food-backend-xi.vercel.app/api/orders/place/${params.id}`,
          {
            status: "Confirmed",
          }
        );

        toast.success("Order has being succesfully confirmed");
      } else {
        toast.success("Only admin user can perfom that task");
      }
    } catch (error) {
      toast.error("Error in confirming Order", error!);
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
