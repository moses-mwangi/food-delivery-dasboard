"use client";
import React from "react";
import useOrder from "../useOrder";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import SingleOrderTable from "./SingleOrderTable";
import { Separator } from "@/components/ui/separator";
import OrderChangeStatus from "./OrderChangeStatus";
import SingleOrderHeader from "./SingleOrderHeader";

export default function SinglePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { orders } = useOrder();
  const single = orders?.filter((el) => el._id === params.id).at(0);

  return (
    <div className=" bg-gray-50 px-10 py-12 h-svh overflow-scroll flex flex-col gap-10">
      <SingleOrderHeader single={single} />
      <SingleOrderTable single={single} />
      <Separator />
      <OrderChangeStatus single={single} params={params} />
    </div>
  );
}
