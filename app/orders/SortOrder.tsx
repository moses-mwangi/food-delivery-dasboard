"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
const sorts = [{ label: "amount" }, { label: "createdAt" }, { label: "name" }];

export default function SortOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    // <Card className="rounded-md w-44">
    <Select
      defaultValue={searchParams.get("SortBy") || ""}
      onValueChange={(order) => {
        const params = new URLSearchParams(searchParams);
        params.set("SortBy", order.toString());
        router.push("?" + params.toString());
        router.refresh();
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sorts.map((el) => (
            <SelectItem key={el.label} value={el.label}>
              SortBy ( {el.label} )
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // </Card>
  );
}
