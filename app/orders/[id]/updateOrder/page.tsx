"use client";

import React from "react";
import useOrder from "../../useOrder";
import { Label } from "@/components/ui/label";

export default function UpdateOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const { orders } = useOrder();
  const single = orders?.filter((el) => el._id === params.id);

  // const {}=useH

  return (
    <div className="bg-gray-50 h-svh px-10 py-8">
      <form action="">
        <div>
          <Label>moses</Label>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </form>
    </div>
  );
}
