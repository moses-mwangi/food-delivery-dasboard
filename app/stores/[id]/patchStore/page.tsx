"use client";
import React from "react";
import UpdateStore from "./Updating";
import useStore from "../../useStore";
import { useParams } from "next/navigation";

export default function UpdateStorePage() {
  const { stores } = useStore();
  const { id } = useParams();
  const store = stores?.find((el) => el._id === id);

  return (
    <div className="mt-10 overflow-scroll h-[90svh] mb-10">
      <div>
        <h1 className="flex justify-center mb-8 text-2xl font-semibold text-slate-700">
          {`Updating ${store?.restName} store`}
        </h1>
      </div>
      <UpdateStore />
    </div>
  );
}
